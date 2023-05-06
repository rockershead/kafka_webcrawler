const { uuid } = require('uuidv4');
const { Kafka } = require('kafkajs')
//const { Client } = require('@elastic/elasticsearch');
const {Crawl_results}=require('../../models')
const moment=require('moment-timezone')

const crawl_result = () => async (req, res, next) => {

  

  Crawl_results.find().select('crawlId module url status createdAt htmlText' )
    .then(results => {
      
      res.status(200).send(results);
    })
    .catch(err => {
      res.status(400).send(err)
    });


  
  
    
  }

module.exports = { crawl_result }