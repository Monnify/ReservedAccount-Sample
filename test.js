import assert from "assert/strict";
import request from "supertest"
import express from "express"
import crypto from 'crypto';
import apiService from "./services/apiService.js"
import router from "./router.js"
import bodyParser from "body-parser";

const requestRouter = router


const app = express();
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use("/api/v1",requestRouter)


let accountReference;
let payload = {
    "customerName": "Tester", "customerEmail": crypto.randomBytes(20).toString('hex') + "@tester.com",
    "accountName": "tester", "contractCode": "7059707855", "bvn": "21212121212","getAllAvaibleBanks":true
};

let token;





beforeEach(async () =>{
    token = await apiService.getAccessToken()

})


describe('Assert Access Token Request', ()=>{
    it('confirm that request is successful', async()=>{
        assert.notStrictEqual(token,false);
    })
})


describe('Check Reserved Account Creation', ()=>{
    it('confirm that reserved account creation works', async () => {
        accountReference = crypto.randomBytes(20).toString('hex');
        const testPayload = { ...payload, accountReference };
        const resp = await request(app).
                    post("/api/v1/trx/reservedAccount").
                    send(testPayload).
                    set("Content-Type", "application/json");
        
        assert.strictEqual(resp.status,200);
        assert.strictEqual(resp.body.status, 'success')
        
    })
})


describe('Get Reserved Account Details', () => {
    it('confirm that reserved account details retrieval works', async () => {
        const url = "/api/v1/trx/reservedAccount/" + accountReference
        const resp = await request(app).
                    get(url).set("Content-Type", "application/json");
        assert.strictEqual(resp.status,200);
        assert.strictEqual(resp.body.status, 'success')
    });
});


describe('Check Reserved Account Deallocation', () => {
    it('confirm that reserved account deallocation works', async () => {
        const url = "/api/v1/trx/reservedAccount/" + accountReference
        const resp = await request(app).
                    delete(url).set("Content-Type", "application/json");
        assert.strictEqual(resp.status,200);
        assert.strictEqual(resp.body.status, 'success')
    });
});