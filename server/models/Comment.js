import mongoose from 'mongoose'

const commentSchema = mongoose.Schema({
  text: String,
  userImg: String,
  userName: String,
  cardId: String
},
  {
    timestamps: true
  })

const Comment = mongoose.model('Comment', commentSchema)

export default Comment