import express from 'express'
import { getBoards, createBoard, updateBoard, deleteBoard } from '../controllers/boards.js'

const router = express.Router()

router.get('/', getBoards)
router.post('/', createBoard)
router.patch('/:id', updateBoard)
router.delete('/:id/deleteBoard', deleteBoard)

export default router