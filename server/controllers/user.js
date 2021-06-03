import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import dotenv from 'dotenv'
import * as variant from '../errors/index.js'

dotenv.config()
const SECRET = process.env.SECRET || 'user'

export const signin = async (req, res) => {
  const { email, password } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (!existingUser)
      return res.status(404).json({ message: variant.USER_DOESNT_EXIST })

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect)
      return res.status(400).json({ message: variant.INVALID_CREDENTIALS })

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET, { expiresIn: '1h' })

    res.status(200).json({ result: existingUser, token })
  } catch (error) {
    res.status(500).json({ message: variant.SOMETHING_WENT_WRONG })
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body

  try {
    const existingUser = await User.findOne({ email })

    if (existingUser)
      return res.status(400).json({ message: variant.USER_ALREADY_EXISTS })

    if (password !== confirmPassword)
      return res.status(400).json({ message: variant.PASSWORDS_DONT_MATCH })

    const salt = 12
    const hashedPassword = await bcrypt.hash(password, salt)

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET, { expiresIn: '1h' })

    res.status(200).json({ result, token })
  } catch (error) {
    res.status(500).json({ message: variant.SOMETHING_WENT_WRONG })
  }
}
