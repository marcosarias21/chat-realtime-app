import dotenv from 'dotenv'
dotenv.config()
import jwt from 'jsonwebtoken'
import User from '../models/user.js'

const secretKey = process.env.SECRET_KEY

const createLogin = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({username})

  if (!user) {
    res.json({
      message: "User inexistent"
    })
  }

  if (password != user.password) {
    res.json({
      message: "Username o password incorrect!"
    })
  } else {
    const token = jwt.sign({user}, secretKey, {expiresIn: '1h'})
    res.json({
      message: "Login succesfully",
      user,
      token
    })
  }  
}

export default createLogin