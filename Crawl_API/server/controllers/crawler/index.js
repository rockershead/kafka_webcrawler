


/**
 * Provide API for Users
 * **/


const { Router: router } = require('express');





const { crawl_result } = require('./crawl_result');
const { crawl_request } = require('./crawl_request');
const {show_crawl_result}=require('./show_crawl_result')



module.exports = () => {
    const api = router();



    api.post('/crawl', crawl_request());
    api.get('/result',crawl_result())
    api.get('/result/:crawlId',show_crawl_result())

    return api;
};
