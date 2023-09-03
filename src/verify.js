const request = require('request');
const verifyPhone=(number,callback)=>{
url="https://phonevalidation.abstractapi.com/v1/?api_key=50091bca21044b9e947ee7d8b1ac76d7&phone="+number
request({url,json :true},(error,data)=>{
        if(error){
            callback('Cannot connect to Api..',undefined)
        }
        else if(data.body.error){
            callback(data.body.error.details.phone[0],undefined)
        }
        else if( !data.body.valid){
            callback('Invalid number..',undefined)
        }
        else{
            callback(undefined,{isvalid:data.body.valid,location :data.body.location, carrier :data.body.carrier})
        }
})
}

module.exports =verifyPhone