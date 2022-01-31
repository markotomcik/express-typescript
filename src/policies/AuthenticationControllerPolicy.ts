import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export default {
  register (req: Request, res: Response, next: NextFunction) {
    const passwordPattern = '^[a-zA-Z0-9]{8,50}$'

    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().regex(new RegExp(passwordPattern)).required()
    })

    const { error } = schema.validate(req.body)

    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email.'
          })
          break
        case 'password':
          res.status(400).send({
            error: 'The provided password failed to match the rules.'
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information.'
          })
      }
    } else {
      next()
    }
  }
}
