const express=require('express');
const cors=require('cors');
require('./DB/Config');
const jwt=require('jsonwebtoken')
const jwtkey='e-comm'

const app=express();
const User=require('./DB/User');
const Product=require('./DB/Product')

app.use(express.json());
app.use(cors());

app.post('/register',async(req,resp)=>{
    let user=new User(req.body);
    let result=await user.save()
    result=result.toObject();
    delete result.password;
    // resp.send(result);

    jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
        if(err){
            resp.send({result:"something went wrong"})
        }
        resp.send({result,auth:token})
    })
})

app.post('/login',async(req,resp)=>{
    if(req.body.password && req.body.email){
        let user=await User.findOne(req.body).select("-password");
        if(user){

            jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    resp.send({result:"something went wrong"})
                }
                resp.send({user,auth:token})
            })

            // resp.send(user);
        }else{
            resp.send({result:"No Found User"})
        }
    }else{
        resp.send({result:"No Result Found"})
    }
})

app.post('/add-product',verifyToken,async(req,resp)=>{
    let product=new Product(req.body);
    let result=await product.save();
    resp.send(result);
})

app.get('/products',verifyToken,async(req,resp)=>{
    let products=await Product.find();
if(products.length>0){
    resp.send(products)
}else{
    resp.send({result:"NOT Found Product"})
}
})

app.delete('/product/:id',verifyToken,async(req,resp)=>{
    let result=await Product.deleteOne({_id:req.params.id})
    resp.send(result);
})

app.get('/product/:id',verifyToken,async(req,resp)=>{
    let result=await Product.findOne({_id:req.params.id})
    if(result){
        resp.send(result)
    }else{
        resp.send({result:"NO Found result"})
    }
})

app.put('/products/:id',verifyToken,async(req,resp)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},{
            $set:req.body
        }
    )
    resp.send(result)
})

app.get('/search/:key',verifyToken,async(req,resp)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}}
        ]
    })
    resp.send(result)
})

function verifyToken(req,resp,next){
    let token=req.headers['authorization'];
    console.log("middleware called if",token)
if(token){
    token=token.split(' ')[1];
    console.log("middleware called if",token)
    jwt.verify(token,jwtkey,(err,valid)=>{
        if(err){
            resp.status(401).send({result:"Please provide valid token"})
        }else{
            next();
        }
    })
}else{
    resp.status(403).send({result:"Plz add token with header"})
}
}

app.listen(5000)