import express, { response } from "express";
import mongoose from "mongoose";
import Question from "../models/questionModel.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { CreateSchema, UserQuestionSchema } from "../JoiModels/CreateSchema.js";
import Comment from "../models/commentModel.js";
const router = express.Router();

const tokenControl = async (req, res, next) => {
  try {
    var token = req.headers.token;
   
    var decoded = jwt.verify(token, "secret");
    var username = decoded.username
    const userPassword = await User.find({ username }).select({ "password": 1,"_id": 0});
    
    if (userPassword[0].password===decoded.password) {
     
      next();
    }
   
    
  } catch (err) {
    
  }
};
router.post("/Create", tokenControl,async (req, res) => {
  try {
   
    
    try {
      const result = await CreateSchema.validateAsync(req.body);
      
    } catch (error) {
      console.log(error);
      return res.status(401).json(error.message);
    }
    const { baslik, yazi, postedBy } = req.body;
    const createdQuestion = await Question.create({
      baslik,
      yazi,
      postedBy,
    });

    return res.status(201).json(createdQuestion);
  } catch (error) {
    return res.status(401).json({ message: "Question create failed", error });
  }
});


router.get("/Q", async (req, res) => {
  try {
    const post = await Question.find({})
      .populate("postedBy", "fullname _id photo")
      .sort([["start", -1]]);

    if (!post) {
      return res.status(400).json({ message: "post Yok" });
    } else {
      return res.status(200).json({ post });
    }
  } catch (error) {
    return res.json({ message: "giriş başarısız" });
  }
});
router.post("/userQuestions", async (req, res) => {
  try {
    try {
        const result = await UserQuestionSchema.validateAsync(req.body);
       
      } catch (error) {
        console.log(error);
        return res.status(401).json(error.message);
      }

    const { username } = req.body;
    const userData = await User.find({ username }).select("_id");

    const post = await Question.find({ postedBy: userData });

    if (!post) {
      return res.status(400).json({ message: "post Yok" });
    } else {
      return res.status(200).json({ post });
    }
  } catch (error) {
    return res.json({ message: "giriş başarısız" });
  }
});



router.post("/getQuestion", async (req, res) => {
 
 
  
  
 
  
  try {
   
    const questionId = req.body.formData.questionId;
    const id= mongoose.Types.ObjectId(questionId);
    parseInt(id.valueOf(), 16)
    
   
    const QuestionData = await Question.findOne( {_id:id} ).populate("postedBy", "fullname _id photo createDate").select({ "baslik": 1,"yazi": 1,"start":1});
    
      return res.status(200).json(QuestionData)

   
  } catch (error) {
    console.log("işlem başarısız")
    return res.status(404).json({ message: "Soru getirilemedi." });
  }
});


router.post("/addComment", async (req, res) => {
 

var token = req.headers.token

const stringAccesToken = token;
var decoded = jwt.verify(stringAccesToken, "secret");

var username = decoded.username
var {id,yorum} = req.body
 id= mongoose.Types.ObjectId(id);
    parseInt(id.valueOf(), 16)
 
const userExists = await User.findOne({username}).select("_id:1")



const yorumAt = new Comment({ paylasanId: userExists.id, paylasimId:id,yorum:yorum });
yorumAt.save(function (err) {
  if (err) return handleError(err);
 
});

  

});
router.post("/getComment", async (req, res) => {
 

  var id = req.body.questionId
  
   id= mongoose.Types.ObjectId(id);
      parseInt(id.valueOf(), 16)
   
  const yorumlar = await Comment.find({paylasimId:id}).populate("paylasanId", "fullname photo createDate").select()
  
  return res.status(200).json({ yorumlar });
  
  
  
  
    
  
  });
export default router;
