import express from 'express'

import AuthenticationController from '../controllers/AuthenticationController'

import AuthenticationControllerPolicy from '../policies/AuthenticationControllerPolicy'

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

export default router
