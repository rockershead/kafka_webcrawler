const axios = require('axios');
const cheerio = require('cheerio');
const { Kafka } = require('kafkajs');
const {Crawl_results}=require('./models')
require('dotenv').config({path:'../.env'})

class Webcrawler{


 constructor(topics){

    this.topics=topics
    
   }


 async topicExist(admin){
   //check if kafka topics exist 

   for(var i=0;i<this.topics.length;i++)
   {
    try{
      const metadata = await admin.fetchTopicMetadata({ topics: [this.topics[i]] });
   
      const res = metadata.topics.find(t => t.name === this.topics[i]);
      if(res)
      {
      console.log('true')
      }
      else{
     // console.log('false')
     await admin.createTopics({
      topics: [
        {
          topic: this.topics[i],
          //numPartitions: numPartitions,
          //replicationFactor: replicationFactor,
        },
      ],
    })
      }
      


    }
    catch{
      //console.log('false')
      await admin.createTopics({
        topics: [
          {
            topic: this.topics[i],
            //numPartitions: numPartitions,
            //replicationFactor: replicationFactor,
          },
        ],
      })
    }

   }

   
       await admin.disconnect();
  }

 

 getUrls(payload){
   
    //check if “(http|https)://” in payload

    return payload.match(/\bhttps?:\/\/\S+/gi)


 }

  crawl(url){
   
    return new Promise((resolve, reject) => {

        axios.get(url)
        .then(response => {
          
         // const $ = cheerio.load(response.data);
          
        
          resolve(response.data)
    
          
       
         
        })
        .catch(error => {
         
          resolve("Error")
        })


    })


    
    

 }

 async finished(html_text,crawlId,producer,url,module){

   //stores in mongodb
    
   if(html_text!="Error")
   {
    var crawl_results=new Crawl_results({"crawlId":crawlId,"url":url,"module":module,"htmlText":html_text,"status":"Complete"})

    
     crawl_results.save().then(result=>{
       
      console.log("done")

     }).catch(err=>{console.log(err)})
    

     //publish status to this.result_topic.publish the crawlid also.
   var feedback={"crawlId":crawlId,"url":url,"module":module,"status":"Complete"}
   await producer.send({
    topic: process.env.RESULT_TOPIC,
    messages: [
      { value: JSON.stringify(feedback) },
    ],
  });


   }

   else{
     
    var crawl_results=new Crawl_results({"crawlId":crawlId,"url":url,"module":module,"status":"Error"})

    
     crawl_results.save().then(result=>{
       
      console.log("done")

     }).catch(err=>{console.log(err)})
    

     //publish status to this.result_topic.publish the crawlid also.
   var feedback={"crawlId":crawlId,"url":url,"module":module,"status":"Error"}
   await producer.send({
    topic: process.env.RESULT_TOPIC,
    messages: [
      { value: JSON.stringify(feedback) },
    ],
  });






   }

   


  
  
  // Disconnect the producer once we're done
  await producer.disconnect();


 }



}

module.exports=Webcrawler;