import mongoose from 'mongoose'

const activitySchema = mongoose.Schema({
  activityText: String,
  userImg: String,
  boardId: String
},
  {
    timestamps: true
  })

const Activity = mongoose.model('Activity', activitySchema)

export default Activity