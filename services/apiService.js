
//import {MonnifyAPI} from  "monnify-nodejs-lib"

import {MonnifyAPI} from "monnify-nodejs-lib"

const config = {
    MONNIFY_APIKEY: {YOUR_API_KEY},
    MONNIFY_SECRET: {YOUR_SECRET_KEY}
}

config.env = process.env.ENVIROMENT || "SANDBOX"

const monnifyClient = new MonnifyAPI(config)


async function getAccessToken(){
    try{
        
        const response = await monnifyClient.getToken()
        if (response[0] === 200){
            return response[1]
        }else{
            throw new Error(JSON.stringify(response[1]))
        }
    }
    catch(err){
        console.log(err)
        return false
    }
}



async function createVirtualAccount(payload){
    try{
        const authToken = await getAccessToken()
        if (!authToken){
            throw new Error("Could not create virtual account at the moment as token is not available")
        }
        

        const response = await monnifyClient.reservedAccount.createReservedAccount(authToken,payload)
        if(response[0] === 200){
            return response[1]
        }else if (response[0] >= 400 && response[0] < 500){
            return response[1]
        }else{
            throw new Error(json.Stringify(response[1]))
        }
    }
    catch(err){
        console.log(err)
        return false
    }
}


async function getVirtualAccountDetails(reference){
    const data = {"accountReference":reference}
    try{
        const authToken = await getAccessToken();
        if (!authToken){
            throw new Error("Could not create virtual account at the moment as token is not available");
        }
        
        const response = await monnifyClient.reservedAccount.reservedAccountDetails(authToken,data);
        if(response[0] === 200){
            return response[1]
        }else if (response[0] >= 400 && response[0] < 500){
            return response[1]
        }else{
            throw new Error(json.Stringify(response[1]))
        }
    }
    catch(err){
        console.log(err)
        return false
    }
}


async function deleteVirtualAccount(reference){
    const data = {"accountReference":reference}
    try{
        const authToken = await getAccessToken()
        if (!authToken){
            throw new Error("Could not create virtual account at the moment as token is not available")
        }
        
        const response = await monnifyClient.reservedAccount.deallocateReservedAccount(authToken,data)
        if(response[0] === 200){
            return response[1]
        }else if (response[0] >= 400 && response[0] < 500){
            return response[1]
        }else{
            throw new Error(json.Stringify(response[1]))
        }
    }
    catch(err){
        console.log(err)
        return false
    }
}






const monnify = {
    getAccessToken,
    createVirtualAccount,
    getVirtualAccountDetails,
    deleteVirtualAccount
}

export default monnify