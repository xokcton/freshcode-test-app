import mongoose from 'mongoose'

const listSchema = mongoose.Schema({
  title: String,
  boardId: String
},
  {
    timestamps: true
  })

const List = mongoose.model('List', listSchema)

export default List