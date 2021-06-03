import mongoose from 'mongoose'

const cardSchema = mongoose.Schema({
  title: String,
  listId: String,
  description: String
},
  {
    timestamps: true
  })

const Card = mongoose.model('Card', cardSchema)

export default Card