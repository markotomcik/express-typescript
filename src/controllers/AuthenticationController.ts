import User from '../models/User'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import { Request, Response } from 'express'

function signToken (user: typeof User) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

export default {
  async register (req: Request, res: Response) {
    try {
      const user = await User.create(req.body)
      const savedUser = await user.save()

      res.status(201).json({
        userId: savedUser.id
      })
    } catch (error) {
      res.status(400).send({
        error: 'Cannot create user'
      })
    }
  },
  async login (req: Request, res: Response) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const userJson = user.toJSON()
      delete userJson.password
      res.send({
        user: userJson,
        token: signToken(userJson)
      })
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to login'
      })
    }
  },
  async changePassword (req: Request, res: Response) {
    try {
      const { userId, oldPassword, newPassword } = req.body
      const user = await User.findById(userId)

      if (!user) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      const isPasswordValid = await user.comparePassword(oldPassword)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'The login information was incorrect'
        })
      }

      user.password = newPassword
      await user.save()

      res.send({
        message: 'Password changed successfully'
      })
    } catch (error) {
      res.status(500).send({
        error: 'An error has occured trying to change password'
      })
    }
  }
}
