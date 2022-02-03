import express from 'express'

import AuthenticationController from '../controllers/AuthenticationController'

import AuthenticationControllerPolicy from '../policies/AuthenticationControllerPolicy'
import isAuthenticated from '../policies/isAuthenticated'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(200)
  res.json({
    message: 'V1 API'
  })
})

router.post('/register',
  AuthenticationControllerPolicy.register,
  AuthenticationController.register)

router.post('/login',
  AuthenticationController.login)

router.post('/changePassword',
  isAuthenticated,
  AuthenticationController.changePassword)

export default router
