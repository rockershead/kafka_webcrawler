const express = require("express");
const path = require('path');
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express");



const api = require('./server/api');
const { fbAuth } = require('./server/utils');
//const {authorize}=require('./authentication.js')

const app = express();
const cors = require('cors');
app.use(cors());



app.use(function(req, res, next) {




  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', api());


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "S2T Webcrawler API with Swagger",
        version: "0.1.0",
        description:
          "This is a webcrawler API application made with Express and documented with Swagger",
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        
      },
      servers: [
        {
          url: "http://localhost:8085/",
        },
      ],
    },
    apis: ["./server/api/index.js"],
  };
  
  const specs = swaggerJsdoc(options);

  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );



/* Enforce https
app.use(function(req, res, next) {
    if(req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
        res.redirect("https://" + req.headers.host + req.url);
    } else {
        next();
    }
});*/

module.exports = {app};
