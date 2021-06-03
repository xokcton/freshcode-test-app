import mongoose from 'mongoose'

const boardSchema = mongoose.Schema({
  title: String,
  createdAt: {
    type: Date,
    default: new Date()
  },
  userId: String
})

const Board = mongoose.model('Board', boardSchema)

export default Board