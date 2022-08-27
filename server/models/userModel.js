import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    photo:{
        type:String,
       
    },
    createDate: {
		type: Date,
		default: Date.now,
		required: 'Must have start date - default value is the created date'
	}
   
})

export default mongoose.model('User',userSchema)