const express =require('express')
const path =require('path')
const hbs =require('hbs')
const verifyPhone = require('./verify.js')
const link = require('./link.js')
const app=express()
const pp=path.join(__dirname,'../public')
const tp=path.join(__dirname,'../templates/views')
const ppp=path.join(__dirname,'../templates/partials')
const port =process.env.PORT || 3000;
app.use(express.static(pp))
app.set('view engine','hbs')
app.set('views',tp)
hbs.registerPartials(ppp)



app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/n',(req,res)=>{
    res.render('q')
})


app.get('/get',(req,res)=>{
    if(!req.query.number){
        return res.send('number query is required')
        
    }
    const n =req.query.number
    let t =req.query.text
    if(t===undefined){
        t=''
    }
    verifyPhone(n,(error,msg)=>{
        if(error){
          return  res.send(error)
          
        }
        else{
            
           const ol= link(n,t);
           res.send({st:'<img src="https://api.qrserver.com/v1/create-qr-code/?data='+encodeURIComponent(ol)+'&amp;size=100x100" alt="error_to_load" title="qr_code" />'})
        }
    })
})

app.get('/num',(req,res)=>{
    if(!req.query.number){
        return res.send('number query is required')
        
    }
    const n =req.query.number
    
    verifyPhone(n,(error,msg)=>{
        if(error){
          return  res.send(error)
          
        }
        else{
            
           
           res.send({st:'<img src="https://api.qrserver.com/v1/create-qr-code/?data=tel:'+encodeURIComponent(n)+'&amp;size=100x100" alt="error_to_load" title="qr_code" />'})
        }
    })
})
app.listen(port ,()=>{
    console.log('Listening to the port'+port )
})








