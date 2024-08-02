import {Schema, models, model} from 'mongoose'

const feedbackschema = new Schema({
    title:{
        type:String,
        required:[true,"title is needed"]
    },
    category:{
        type:String,
        enum:["feature","enhancement","bug","ui","ux"],
        required:[true,"category is needed"]
    },
    details:{
        type:String,
        required:[true,"detail is needed"]
    },
    status:{
        type:String,
        enum:["planned","progress","live"],
        required:[true,"status is needed"],
        default:"planned"
    },
    slug:{
        type:String,
        required:[true,"slug is needed"],
    },
    upvotes:{
        type:Number,
        default:0
    },
    created_by:{
        type:Schema.Types.ObjectId,
        ref:'users'
    }
}, {timestamps:true})

const Feedback = models.Feedbacks || model("Feedbacks", feedbackschema)

module.exports = Feedback