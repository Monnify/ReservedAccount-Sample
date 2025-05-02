// const express = require('express')
//const requestRouter = require("./router")
// const bodyParser = require("body-parser")


import router from "./router.js"
import express from 'express'
import bodyParser from "body-parser";

const requestRouter = router



const notFound = (req, res, next) => {
    res.status(404);
    res.json({
      status: 404,
      msg: "Resource was not found",
    });
  };
  
 
  const handleError = (error, req, res, next) => {
    console.log(error);
    res.status(error.status || 500);
    res.json({
      status:"failed",responseBody:" An error occurred while processing your request"
    });
  };

const app = express()

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use("/api/v1",requestRouter)
app.use(notFound);
app.use(handleError);



const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server started at port: " + PORT))
