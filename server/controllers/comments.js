import Comment from '../models/Comment.js'

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()

    res.status(200).json(comments)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

export const createComment = async (req, res) => {
  const comment = req.body
  const newComment = new Comment(comment)

  try {
    await newComment.save()

    res.status(201).json(newComment)
  } catch (error) {
    res.status(409).json({ message: error.message })
  }
}