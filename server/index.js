import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postBoards from './routes/boards.js'
import userRoutes from './routes/users.js'
import listsRoutes from './routes/lists.js'
import cardsRoutes from './routes/cards.js'
import commentsRoutes from './routes/comments.js'
import activitiesRoutes from './routes/activities.js'

dotenv.config()
const app = express()


app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use('/boards', postBoards)
app.use('/user', userRoutes)
app.use('/lists', listsRoutes)
app.use('/cards', cardsRoutes)
app.use('/comments', commentsRoutes)
app.use('/activities', activitiesRoutes)

// const CONNECTION_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.seqdj.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000
const CONNECTION_URL = 'mongodb://mongo:27017/freshcode'

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log('Вроде все пашет, можешь выдохнуть')))
  .catch((error) => console.log(error))

mongoose.set('useFindAndModify', false)