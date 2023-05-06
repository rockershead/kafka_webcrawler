const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const crawl_resultsSchema = new Schema({
    crawlId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true
  },
  htmlText: {
    type: String,
    required: false
  },
  module: {
    type: String,
    required: true
  }
}, { timestamps: true });



const Crawl_results = mongoose.model('Crawl_results', crawl_resultsSchema);    //keep it to capital letters
module.exports = {Crawl_results};