import { Schema, models, model } from "mongoose";

const commentSchmema = new Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: [true, "please input the commenter"],
  },
  comment: {
    type: String,
    required: [true, "please type something"],
  },
  feedback: {
    type: Schema.Types.ObjectId,
    ref: 'feedbacks',
    required: [true, "please type something"],
  },
  replies: [],
});


const comment = models.comments || model('comments', commentSchmema)


module.exports = comment