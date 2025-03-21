import User from "../models/user.js"

const createUser = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const newUser = new User({
      username,
      email,
      password
    })

    const emailExisting = await User.findOne({ email })
    const userNameExisting = await User.findOne({ username })
    
    if (emailExisting & userNameExisting) {
      res.json({
        message: "Email or Username existing, change"
      })
    } else{
      await newUser.save()
      res.json({
        message: "Usuario creado exitosamente!"
      })
    }

  } catch (error) {
    res.json({
      message: error
    })
  }
} 

export default createUser