import { Schema, models, model } from "mongoose";

const commentSchmema = new Schema({
  commenter: {
    type: Schema.Types.ObjectId,
    ref: users,
    required: [true, "please input the commenter"],
  },
  comment: {
    type: String,
    required: [true, "please type something"],
  },
  replies: [this],
});


const comments = models.comments || model('comments', commentSchmema)


module.exports = comments