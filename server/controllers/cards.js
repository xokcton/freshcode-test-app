import mongoose from 'mongoose'
import Card from '../models/Card.js'
import * as variant from '../errors/index.js'

export const getCards = async (req, res) => {
  try {
    const cards = await Card.find()

    res.status(200).json(cards)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createCard = async (req, res) => {
  const card = req.body
  const newLCard = new Card(card)

  try {
    await newLCard.save()

    res.status(201).json(newLCard)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}

export const updateCard = async (req, res) => {
  const { id: _id } = req.params
  const card = req.body

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(variant.NO_CARD_ID)

  try {
    const updatedCard = await Card.findByIdAndUpdate(_id, card, { new: true })

    res.json(updatedCard)
  } catch (error) {
    console.log(error)
  }
}

export const deleteCard = async (req, res) => {
  const { id: _id } = req.params

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(variant.NO_CARD_ID)

  try {
    await Card.findByIdAndRemove(_id)

    res.json({ message: variant.CARD_DELETED })
  } catch (error) {
    console.log(error)
  }
}