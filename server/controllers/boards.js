import mongoose from 'mongoose'
import Board from '../models/Board.js'
import * as variant from '../errors/index.js'

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find()

    res.status(200).json(boards)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createBoard = async (req, res) => {
  const board = req.body
  const newBoard = new Board(board)

  try {
    await newBoard.save()

    res.status(201).json(newBoard)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateBoard = async (req, res) => {
  const { id: _id } = req.params
  const board = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(variant.NO_BOARD_ID)

  try {
    const updatedBoard = await Board.findByIdAndUpdate(_id, board, { new: true })

    res.json(updatedBoard)
  } catch (error) {
    console.log(error)
  }
}

export const deleteBoard = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(variant.NO_BOARD_ID)

  try {
    await Board.findByIdAndRemove(_id)

    res.json({ message: variant.BOARD_DELETED })
  } catch (error) {
    console.log(error)
  }
}