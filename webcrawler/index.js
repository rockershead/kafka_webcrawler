const Webcrawler = require('./webcrawler');
const crawler = new Webcrawler([process.env.REQUEST_TOPIC,process.env.RESULT_TOPIC]);
//const { Client } = require('@elastic/elasticsearch');
const mongoose = require('mongoose');

const { Kafka } = require('kafkajs')
require('dotenv').config({path:'../.env'})


const kafka = new Kafka({
  clientId: 'kafka-nodejs-starter',
  brokers: process.env.KAFKA_BROKERS.split(','),
  producer: {
    idempotent: true,
  }
});

const mongodbUrl=`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASS}@e-commerce.bdlybev.mongodb.net/S2T?retryWrites=true&w=majority`
mongoose.connect(mongodbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ' + err));

//const elasticClient = new Client({
  //node: 'http://54.151.192.14:9200/',
  //auth: {
    //username: 'your_username',
    //password: 'your_password'
 // }
//});

const admin = kafka.admin();




async function main(){
    //when code runs in the beginning, check if pub/sub topic exists in kafka
    await crawler.topicExist(admin)

    //subscribe to kafka topic and listen for messages
    const consumer = kafka.consumer({ groupId: 'test-group'})

    await consumer.connect()
    await consumer.subscribe({ topic: process.env.REQUEST_TOPIC })
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
       //find for the urls
        var urls=crawler.getUrls(message.value.toString())
        //console.log(urls)
        if((urls!=null)&&(urls!=undefined))
        {
           urls.forEach(async url => {
            //crawl the url
            var output=await crawler.crawl(url)
            //console.log(output)
              //when crawling completes store in mongodb and publish status to result topic
              const producer = kafka.producer()
              await producer.connect()
              await crawler.finished(output,JSON.parse(message.value.toString()).crawlId,producer,url,"WebCrawler1")
            
           });


        }
        
      
 },
    });

    
    

    

}
main()



