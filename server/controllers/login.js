import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const secretKey = process.env.SECRET_KEY

const createLogin = async (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  const user = await User.findOne({ username })

  if (!user) {
    return res.json({
      message: "User inexistent"
    })
  }

  if (password !== user.password) {
    return res.json({
      message: "Username or password incorrect!"
    })
  } else {
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' })
    return res.status(200).json({
      message: "Login successful",
      user,
      token,  
    })
  }
}

export default createLogin