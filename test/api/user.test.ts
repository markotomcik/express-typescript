import request from 'supertest'
import { describe, it } from 'mocha'

import app from '../../src/app'

const user: {[k: string]: any} = {}

user.email = `${Math.random()}@test.com`
user.password = 'test1234'

describe('POST /api/v1/register', () => {
  it('creates a user', (done: any) => {
    request(app)
      .post('/api/v1/register')
      .send({
        email: user.email,
        password: user.password
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res: any) {
        if (res.body.userId) {
          return true
        }
      })
      .expect(201, done)
  })
})

describe('POST /api/v1/login', () => {
  it('logs in a user', (done: any) => {
    request(app)
      .post('/api/v1/login')
      .send({
        email: user.email,
        password: user.password
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res: any) {
        if (typeof res.body.user === 'object' && typeof res.body.token === 'string') {
          user.id = res.body.user._id
          user.token = res.body.token
          return true
        }
      })
      .expect(200, done)
  })
})

describe('POST /api/v1/changePassword', () => {
  it('changes a user password', (done: any) => {
    request(app)
      .post('/api/v1/changePassword')
      .send({
        userId: user.id,
        oldPassword: user.password,
        newPassword: 'test5678'
      })
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${user.token}`)
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Password changed successfully'
      }, done)
  })
})
