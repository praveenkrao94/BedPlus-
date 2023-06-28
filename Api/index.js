const express = require('express');

const cors = require('cors');

const cookieParser = require('cookie-parser')

const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')

require('dotenv').config()



const User= require('./models/User')  //  user model 

const Place = require('./models/Place')  // place model

const Booking = require('./models/Booking') // booking model

const bcrypt = require('bcryptjs')

const imageDownloader = require('image-downloader')          // image downloader

const multer = require('multer')

const bcryptSalt = bcrypt.genSaltSync(10) /// for password crypt

const app = express();

const jwtSecret = '4f6sd4f66e4f6f43s4f+e8'   // secret key for jwt



app.use(express.json());


app.use('/uploads',express.static('uploads'));   /// make the upload folder static



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

// ------------------------------------------------upload Link--------------------------------------------------------



app.post('/upload-by-link' ,async  (req,res)=>{

      const {link} = req.body

    const newName = 'photo' + Date.now() + '.jpg';

   await imageDownloader.image({
        url:link,
        dest: __dirname + '/uploads/' + newName


      });

      res.json(newName)
      
 
    })

    // ----------------------------------------------------------upload icon ----------------------------------------

    const fs = require('fs')

    const photosMiddleware = multer({dest:'uploads/'})

    app.post('/upload' ,photosMiddleware.array('photos' , 100), (req,res)=>{  

 // note: "photo" it is the key value set during the form array in place :- data.append('photo',files)
const uplodedFiles = []
      for (let i =0 ;i < req.files.length ;i++){
        const {path,originalname} = req.files[i]
        const parts = originalname.split('.')
        const extp = parts[parts.length - 1]

        const newPath = path + '.'+  extp;
        fs.renameSync(path ,newPath)
        uplodedFiles.push(newPath.replace('uploads\\',''));
      }

      res.json(uplodedFiles)
    })

// ================================================ Alternative from ai ===========================================

//     const fs = require('fs');
// const path = require('path');
// const photosMiddleware = multer({ dest: 'uploads/' });

// app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
//   const uploadedFiles = req.files.map(file => {
//     const { path, originalname } = file;
//     const fileExtension = path.extname(originalname).slice(1);

//     const newPath = `${path}.${fileExtension}`;
//     fs.renameSync(path, newPath);
//     return newPath.replace('uploads\\', '');
//   });

//   res.json(uploadedFiles);
// });


// ==================================================================================================================

app.post('/places' , async (req,res)=>{
  const{token} = req.cookies
  const {title,
    address,
    addedPhotos ,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,price,
    maxGuest} = req.body
  jwt.verify(token,jwtSecret,{},async (err,userData)=>{
if(err) throw err;
const PlaceDoc=  await Place.create({
  owner:userData.id,
  title,
    address,
    photos:addedPhotos ,
    perks,
    description,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,price
})
res.json(PlaceDoc)
  })
   
})


// for all place

app.get('/user-places' , (req,res)=>{
  const{token} = req.cookies
  jwt.verify(token,jwtSecret,{},async (err,userData)=>{
    const{id}= userData;
    res.json(await Place.find({owner:id}))
  })
})

// for single place

app.get('/places/:id' , async (req,res)=>{
  const {id} = req.params
  res.json(await Place.findById(id))
 
})



//  update the place

app.put('/places' ,async (req,res)=>{
  const{token} = req.cookies
  const {
    id,
    title,
    address,
    addedPhotos ,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    price,
    maxGuest} = req.body
   
    jwt.verify(token,jwtSecret,{},async (err,userData)=>{
      if(err) throw err
      const placeDoc = await Place.findById(id);
      if(userData.id ===  placeDoc.owner.toString()){
          placeDoc.set({
            
  title,
    address,
    photos:addedPhotos ,
    perks,
    description,
    extraInfo,
    checkIn,
    checkOut,
    maxGuest,
    price,

          })
      await placeDoc.save()
       res.json('updated')
      }
    })

})

//  to call all the places to main 


app.get('/places' ,async  (req,res)=>{
  res.json(await Place.find())
})


// booking page //

app.post('/bookings', async (req,res)=>{
  const userData = await getUserDataFromReq(req)
  const{place,checkIn,checkOut,numbeOfGuests,name,mobile,price}= req.body
  Booking.create({
    place,checkIn,checkOut,numbeOfGuests,name,mobile,price,user:userData.id
  }).then((doc)=>{
   
    res.json(doc)
  }).catch(err =>{
    console.log('error in booking ', err)
  })

});




//  to get user data



function getUserDataFromReq(req){
  return new Promise((resolve,reject)=>{
    jwt.verify(req.cookies.token,jwtSecret,{},async (err,userData)=>{
      if(err) throw err
     resolve(userData)
    })
  })

}

app.get('/bookings' , async (req,res)=>{
const userData=  await getUserDataFromReq(req);
res.json( await Booking.find({user:userData.id}) .populate('place'))  
})


app.listen(4000, () => {
  
  console.log('Server s running on port 4000');
});





// iGu8IQ0SdqiBv1Qc