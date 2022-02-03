import passport from 'passport'
import User from './models/User'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import config from './config/config'

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
  }, async (jwtPayload, done) => {
    try {
      const user = await User.findById(jwtPayload._id)

      if (!user) {
        return done(new Error(), false)
      }

      return done(null, user)
    } catch (error) {
      return done(new Error(), false)
    }
  })
)

export default null
