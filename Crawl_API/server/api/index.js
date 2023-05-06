/**
 * @swagger
 * components:
 *   schemas:
 *     crawl_results:
 *       type: object
 *       required:
 *         - crawlId
 *         - status
 *         - htmlText
 *         - module
 *         - url
 *         - createdAt
 *       properties:
 *         crawlId:
 *           type: string
 *           description: The auto-generated crawlId of the crawler request
 *         status:
 *           type: string
 *           description: Indicates if the crawling is completed
 *         htmlText:
 *           type: string
 *           description: The output of the crawling
 *         module:
 *           type: string
 *           description: The webcrawler service that has done the work
 *         url:
 *           type: string
 *           description: The url that was crawled upon
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the crawler result was added
 * 
 *     crawl_requests_response:
 *       type: object
 *       required:
 *         - crawlId
 *         
 *       properties:
 *         crawlId:
 *           type: string
 *           description: The auto-generated crawlId of the crawler request
 * 
 *     crawl_requests_body:
 *       type: object
 *       required:
 *         - payload
 *         
 *       properties:
 *         payload:
 *           type: string
 *           description: The payload string used for checking for http or https urls
 *     
 */
/**
 * @swagger
 * tags:
 *   name: crawl_results
 *   description: webcrawler API application
 * /crawler/result:
 *   get:
 *     summary: Lists all the crawl results
 *     tags: [crawl_results]
 *     responses:
 *       200:
 *         description: The list of the crawl results
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/crawl_results'
 * 
 * /crawler/crawl:
 *   post:
 *     summary: Create a crawl request
 *     tags: [crawl_requests]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/crawl_requests_body'
 *     responses:
 *       200:
 *         description: Create a crawl request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/crawl_requests_response'
 *       500:
 *         description: Some server error
 * 
 * 
 * /crawler/result/{crawlId}:
 *   get:
 *     summary: Get a crawl result by id
 *     tags: [crawl_results]
 *     parameters:
 *       - in: path
 *         name: crawlId
 *         schema:
 *           type: string
 *         required: true
 *         description: The crawl result crawlId
 *     responses:
 *       200:
 *         description: The filtered crawl results response by crawlId
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/crawl_results'
 *       404:
 *         description: The crawlId is not found
 
*/


 





const express = require('express');

const { errorHandler } = require('../middleware');


// List all models here



// List all controllers here
const crawler = require('../controllers/crawler');







const routersInit = config => {
  const router = express();
  //router.use(permissionHandler)


  // Define API Endpoints
  router.use('/crawler', crawler());
  
  
  
  
  // Catch all API Errors
  router.use(errorHandler);
  return router;
};

module.exports = routersInit;
