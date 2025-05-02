// const apiService = require("../services/apiService.js")
// const utils = require("../utils")

import apiService from "../services/apiService.js"



async function generateReservedAccount(req, res, next){
    try{
        console.log(req.body)
        const resp = await apiService.createVirtualAccount(req.body)
        if(resp){
            if(resp.requestSuccessful === true){
                const response = {
                "status":"success",
                "responseBody":resp.responseBody
            }
            return res.status(200).send(response)
            }else{
                const response = {
                "status":"failed",
                "responseBody":resp.responseMessage
            }
            return res.status(400).send(response)
            }
            
        }else{
            const response = {
                "status":"failed",
                "responseBody":"Service is currently unavailable"
            }
            return res.status(500).send(response)
        }
    }
    catch(err){
        console.log(err)
        next(err)
    }
}


async function getReservedAccount(req, res, next){
    try{
        const resp = await apiService.getVirtualAccountDetails(req.params.accountReference)
        if(resp){
            if(resp.requestSuccessful === true){
                const response = {
                "status":"success",
                "responseBody":resp.responseBody
            }
            return res.status(200).send(response)
            }else{
                const response = {
                "status":"failed",
                "responseBody":resp.responseMessage
            }
            return res.status(400).send(response)
            }
            
        }else{
            const response = {
                "status":"failed",
                "responseBody":"Service is currently unavailable"
            }
            return res.status(500).send(response)
        }
    }
    catch(err){
        console.log(err)
        next(err)
    }
}


async function deallocateReservedAccount(req, res, next){
    try{
        var response = {}
        console.log(req.body)
        const resp = await apiService.deleteVirtualAccount(req.params.accountReference)
        if(resp){
            if(resp.requestSuccessful === true){
                const response = {
                "status":"success",
                "responseBody":resp.responseBody
            }
            return res.status(200).send(response)
            }else{
                const response = {
                "status":"failed",
                "responseBody":resp.responseMessage
            }
            return res.status(400).send(response)
            }
            
        }else{
            const response = {
                "status":"failed",
                "responseBody":"Service is currently unavailable"
            }
            return res.status(500).send(response)
        }
    }catch(err){
        console.log(err)
        next(err)
    }
}



const trx = {
    generateReservedAccount,
    getReservedAccount,
    deallocateReservedAccount
}

export default trx