import express from 'express'
import { getActivities, createActivity } from '../controllers/activities.js'

const router = express.Router()

router.get('/', getActivities)
router.post('/', createActivity)

export default router