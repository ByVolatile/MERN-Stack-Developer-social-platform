import express from "express";
import mongoose from "mongoose";
import User from '../models/userModel.js';
import Post from "../models/postModel.js";
import multer from "multer";
import jwt from "jsonwebtoken"
import { v4 as uuidv4 } from 'uuid';
import { signInSchema, UserDataSchema,searchUserSchema } from "../JoiModels/CreateSchema.js";
import bcrypt from "bcrypt";
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads");  //./../client/public/uploads
    },
    filename:function(req,file,cb){
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null,uuidv4()+"."+extension); 
    }
}) 
const upload = multer({storage})   
const router = express.Router();

router.post("/signup",upload.single("file"), async (req,res)=>{
    try{
        
        const {fullname,password,email,username} = req.body;
        const photo =req.file.filename;
        const userExists = await User.findOne({username:username})
        console.log(userExists,"yoh")
        if(userExists){
            
            return res.status(401).json({message: 'Bu kullanıcı adı kullanılmakta.'});
        }
        const hashedHassword = await bcrypt.hash(password,10)
        const createdUser = await User.create({
            fullname,
            password:hashedHassword,
            email,
            username,
            photo
        })
        console.log(createdUser)
        return res.status(200).json({message:"işlem tamam"});
    }
    catch(error){
        console.log(error)
        return res.status(401).json({essage:"create user fail"})
    }

})
router.post("/signin", async (req,res)=>{
    try{
        try {
         
            const result = await signInSchema.validateAsync(req.body);
           
          } catch (error) {
            console.log(error);
          

            return res.status(401).json(error.message);
          }
        const {username,password} = req.body;
       
        
        const user = await User.findOne({username})
        
        if(!user){
           
            return res.status(400).json({message: 'email yanlış'});
        }
       const isPasswordCorrect = await bcrypt.compare(password,user.password)
      
       if(!isPasswordCorrect){
       
        return res.status(400).json({message: 'şifre yanlış'});
       }
       let token = jwt.sign({
        username,
        password:user.password
      }, 'secret', { expiresIn: '10h' });
      
       return res.status(200).json({user,message:'Giriş Başarılı',token})
    }
    catch(error){
        console.log(error)
        return res.json({message:"giriş başarısız"})
    }

})
router.post("/searchUser", async (req,res)=>{
    try{
        try {
            const result = await searchUserSchema.validateAsync(req.body);
           
          
          } catch (error) {
            console.log(error);
            return res.status(401).json(error.message);
          }
        let {search} =req.body 
        search = search.replace(/[\\\.\+\*\?\^\$\[\]\(\)\{\}\/\'\#\:\!\=\|]/ig, "\\$&");
   
        const user = await User.find({$or:[{ "username": { $regex: '.*' + search + '.*',"$options":"i" } },{ "fullname": { $regex: '.*' + search + '.*',"$options":"i" } }]})
       
        if(!user){
            return res.status(400).json({message: 'hata'});
        }
      
      
 
       return res.status(200).json({user})
    }
    catch(error){
        console.log(error)
        return res.status(400).json({message:"giriş başarısız"})
    }

})


router.get("/signin", async (req,res)=>{
    try{
        
        try {
            const result = await signInSchema.validateAsync(req.body);
           
          } catch (error) {
            console.log(error);
            return res.status(401).json(error.message);
          }
        const {email,password} = req.body;
        const user = await User.find({}).select({ "fullname": 1,"email":1, "_id": 0})
        if(!user){
            return res.status(400).json({message: 'Kullanıcı Yok'});
        }
        else{
            
            return res.status(200).json({user});
        }
    }
    catch(error){
        console.log(error)
        return res.json({message:"giriş başarısız"})
    }

})
router.post("/userData", async (req,res)=>{
    try{
       
       

        try {
            const result = await UserDataSchema.validateAsync(req.body);
            
          } catch (error) {
            console.log(error);
            return res.status(401).json(error.message);
          }
          const {username} = req.body;
        const user = await User.findOne({username}).select({ "fullname": 1,"email":1, "_id": 0, "photo": 1,"createDate":1, "followers":1,"followings":1})
        if(!user){
            return res.status(400).json({message: 'Kullanıcı Yok'});
        }
        else{
            
            return res.status(200).json({user});
        }
    }
    catch(error){
        console.log(error)
        return res.json({message:"giriş başarısız"})
    }

})


/* router.post("/post",upload.single("file"),async (req,res)=>{
    try{
    const {baslik,aciklama}=req.body;
    const resim =req.file.filename;
   
   
    
    const createdPost = await Post.create({
        baslik,
        aciklama,
        resim
    })
    return res.status(201).json(createdPost);
    }
    catch(error){
       
        return res.json({message:"Bir sorun oluştu."})
        
    }

})
*/
/*
router.get("/post",async (req,res)=>{
    try{
       
        
        const post = await Post.find({})
        if(!post){
            return res.status(400).json({message: 'post Yok'});
        }
        else{
            
            return res.status(200).json({post});
        }
    }
    catch(error){
        console.log(error)
        return res.json({message:"giriş başarısız"})
    }

}) */
router.put("/updateUsername/:username", async (req, res) => {
   
        try {
            console.log(req.params.username)
            console.log(req.body)
    let newUsername = req.body.data.newUsername;
        

      const user = await User.findOne({username:req.params.username});
            console.log(user,"userim")
    await user.updateOne({ $set: {fullname:newUsername} });
    return res.status(200).json()
    } catch (err) {
      console.log("error")
      console.log(err)
      res.status(500).send(err);
    }
  }); 

  router.put("/follow/:id", async (req, res) => {
   
  
    
    
        const currentUser = await User.findById(req.params.id);
        console.log(currentUser,"current")
        const user = await User.findOne({username:req.body.userId});
        console.log(user,"user")
        if(currentUser.username == user.username){
          return res.status(403).json({message:"Kendini takip edemezsin."})
        }
        if (!currentUser.followings.includes(user._id)) {
          console.log("hi")
         var x  = await user.updateOne({ $push: { followers: currentUser._id} });
         var y = await currentUser.updateOne({ $push: { followings: user._id} });
         console.log(x,y)
          res.status(200).json("Takip edildi");
        } else {
          res.status(403).send("Zaten takiptesin.");
        }
      
    
  });

  router.put("/unfollow/:id", async (req, res) => {
    
      try {
        const currentUser = await User.findById(req.params.id);
        
        const user = await User.findOne({username:req.body.userId});
        if(currentUser.username == user.username){
          return res.status(403).json({message:"Kendini takip edemezsin."})
        }
        if (user.followers.includes(req.params.id)) {
          console.log("hi")
          await user.updateOne({ $pull: { followers: currentUser._id } });
          await currentUser.updateOne({ $pull: { followings: user._id } });
          res.status(200).json("Takipten çıktın");
        } else {
          res.status(403).send("Zaten takipte değilsin");
        }
      } catch (err) {
        res.status(500).send(err);
      }
    
  });

export default router;