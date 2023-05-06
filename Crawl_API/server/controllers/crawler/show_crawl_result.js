const { uuid } = require('uuidv4');
const { Kafka } = require('kafkajs')
//const { Client } = require('@elastic/elasticsearch');
const {Crawl_results}=require('../../models')


const show_crawl_result = () => async (req, res, next) => {
  const {crawlId}=req.params
  const results=await Crawl_results.find({crawlId:crawlId}).select('crawlId module url status createdAt htmlText' )

   
  res.send(results)
  
  
    
  }

module.exports = { show_crawl_result }