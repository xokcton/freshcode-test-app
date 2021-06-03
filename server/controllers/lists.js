import mongoose from 'mongoose'
import List from '../models/List.js'
import * as variant from '../errors/index.js'

export const getLists = async (req, res) => {
  try {
    const lists = await List.find()

    res.status(200).json(lists)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createList = async (req, res) => {
  const list = req.body
  const newList = new List(list)

  try {
    await newList.save()

    res.status(201).json(newList)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateList = async (req, res) => {
  const { id: _id } = req.params
  const list = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(variant.NO_LIST_ID)

  try {
    const updatedList = await List.findByIdAndUpdate(_id, list, { new: true })

    res.json(updatedList)
  } catch (error) {
    console.log(error)
  }
}

export const deleteList = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(variant.NO_LIST_ID)

  try {
    await List.findByIdAndRemove(_id)

    res.json({ message: variant.LIST_DELETED })
  } catch (error) {
    console.log(error)
  }
}