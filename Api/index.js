const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

require('dotenv').config()

const User= require('./models/User')  // model 

const bcrypt = require('bcryptjs')

const bcryptSalt = bcrypt.genSaltSync(10) /// for password crypt

const app = express();

const jwtSecret = '4f6sd4f66e4f6f43s4f+e8'   // secret key for jwt



app.use(express.json());


app.use(cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

app.use(cookieParser())   //read cookie

mongoose.connect(process.env.MONGO_URL)


app.get('/test', (req, res) => {
  res.json('test ok');
});


// for Register page
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try{
    const userDoc =  await User.create({
       name,
       email,
       password:bcrypt.hashSync(password,bcryptSalt)
     })
     res.json({newuser : userDoc})
  }
  catch (err) {
    res.json({msg:err.msg})
  }
});


//for Login page 

app.post('/login' ,async(req,res)=>{
  const{email,password} = req.body
  
  const userDoc =  await User.findOne({email})
  try{
    if(userDoc){
      const passok =bcrypt.compareSync(password,userDoc.password)
      if(passok){
          jwt.sign({email:userDoc.email, id:userDoc._id} ,jwtSecret ,{} ,(err,token)=>{
            if(err) throw err;
            res.cookie('token',token).json(userDoc)
          })
      }else{
        res.status(422).json('incorrect password')
      }
    }else{
      res.json('Not found')
    }
  
  }
  catch(err){
    res.json({msg:err.msg})
  }
  
})

//profile

app.get('/profile', (req, res) => {
  const { token } = req.cookies;  //reterive token from cookies
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userdata) => {
      if (err) 
      return res.json({err:"invalid"})

      const {name,email,_id} = await User.findById(userdata.id)
     
        res.json({name,email,_id})
    
        
      
    });
  }else{
    res.json(null)
  }
});


///logout////

app.post('/logout',(req,res)=>{
  try{
    res.cookie('token' ,'').json(true)      // way to make token empty 
  }
  catch(err){
    res.json({msg:err.msg})
  }
})


app.listen(4000, () => {
  
  console.log('Server s running on port 4000');
});


// iGu8IQ0SdqiBv1Qc