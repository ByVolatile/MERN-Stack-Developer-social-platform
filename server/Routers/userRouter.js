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
        const userExists = await User.findOne({email})
        if(userExists){
         
            return res.status(400).json({message: 'user already exists'});
        }
        const hashedHassword = await bcrypt.hash(password,10)
        const createdUser = await User.create({
            fullname,
            password:hashedHassword,
            email,
            username,
            photo
        })
        return res.status(200).json({message:"işlem tamam"});
    }
    catch(error){
        console.log(error)
        return res.status(401).json({message:"create user fail"})
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
        const {search} = req.body;
    

        const user = await User.find({ "username": { $regex: '.*' + search + '.*' } })
       
        if(!user){
            return res.status(400).json({message: 'hata'});
        }
      
      
 
       return res.status(200).json({user})
    }
    catch(error){
        console.log(error)
        return res.json({message:"giriş başarısız"})
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
        const user = await User.findOne({username}).select({ "fullname": 1,"email":1, "_id": 0, "photo": 1,"createDate":1})
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

export default router;