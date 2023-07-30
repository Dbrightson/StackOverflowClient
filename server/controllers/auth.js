import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import expressJwt from 'express-jwt'
import users from '../models/auth'
import config from '../config/config'

const signup = async (req, res) => {
    const { name, email, password } = req.body
    try {
        const user = await users.findOne({ email })
        if (user) {
            return res.status(404).send({message:"User already exists."})
        }
        // const hashedPassword = await bcrypt.hash(password,12)
        const newUser = new users({
          name: name,
          email: email,
          password: password
        })
        await newUser.save()
        // const token = jwt.sign({ email: newUser.email, id: newUser._id }, "test",{expiresIn:'1h'})
        const token = jwt.sign({ email: newUser.email, _id: newUser._id }, process.env.JWT_SECRET,{expiresIn:'24h'})
        res.status(200).send({user: {_id: newUser._id, name: newUser.name, email: newUser.email},result:newUser,token})

    } catch (error) {
        res.status(500).send({message:error+' auth - controller signup'})
    }
}
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await users.findOne({ email })
        // console.log('login auth.js controllers',user);
        if (!user) {
            return res.status(404).json({error:"User Doesn't exist."})
        }

        // const isPasswordCrt = await bcrypt.compare(password,user.password)
        if (!user.authenticate(password)) {
            return res.status(401).send({error:'Invalid Credentials'})
        }
        const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET || 'test',{expiresIn:'24h'})
        res.cookie("t", token, {
            expire: new Date() + 9999
          })
        res.status(200).json({ user: {_id: user._id, name: user.name, email: user.email},result: user, token })
        
    } catch (error) {
        res.status(500).send({message:error+' auth - controller login'})
    }
}

const signout = (req, res) => {
    res.clearCookie("t")
    return res.status('200').json({
      message: "signed out"
    })
  }
  
  const requireSignin = expressJwt({
    secret: config.jwtSecret,
    userProperty: 'auth'
  })
  
  const hasAuthorization = (req, res, next) => {
    const authorized = req.profile && req.auth && req.profile._id == req.auth._id
    if (!(authorized)) {
      return res.status('403').json({
        error: "User is not authorized"
      })
    }
    next()
  }
  
export {
    login,
    signup,
    signout,
    requireSignin,
    hasAuthorization
  }
  