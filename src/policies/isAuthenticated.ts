import { NextFunction, Request, Response } from 'express'
import passport from 'passport'

function isAuthenticated (req: Request, res: Response, next: NextFunction) {
  passport.authenticate('jwt', (err, user, info) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(403).send({
        error: 'The login information was incorrect'
      })
    }

    req.user = user
    next()
  })(req, res, next)
}

export default isAuthenticated
