//used to fill up the notes under deployment_history when maintenenace technician goes down to log down what he did for the inverter
const { uuid } = require('uuidv4');

const { Kafka } = require('kafkajs');
require('dotenv').config({path:'../.env'})
const crawl_request = () => async (req, res, next) => {
   
      const {payload}=req.body
      const kafka = new Kafka({
        clientId: 'kafka-nodejs-starter',
        brokers: process.env.KAFKA_BROKERS.split(','),
        producer: {
          idempotent: true,
        }
      });
    
      const admin = kafka.admin();

        //generate payload with uuid
        var crawlId=uuid()
        const jsondata={"crawlId":crawlId,"payload":payload}

        const producer = kafka.producer()
        await producer.connect()

        //list the topics 

        const topics = await admin.listTopics();

        //publish to those topics with same pattern as  crawl_request_*

        for(var i=0;i<topics.length;i++)
        {
          if(/crawl_request_/.test(topics[i]))
          {
            //console.log(topics[i])
            await producer.send({
              topic: topics[i],
              messages: [
                { value: JSON.stringify(jsondata) },
              ],
            });


          }


        }
    
   
    
    
    // Disconnect the producer once we're done
    await producer.disconnect();
    
    res.status(200).send({crawlId:crawlId})
  
  }

module.exports = { crawl_request }
