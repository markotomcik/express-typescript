import request from 'supertest'
import { describe, it } from 'mocha'

import app from '../../src/app'

describe('POST /api/v1/register', () => {
  it('creates a user', (done: any) => {
    request(app)
      .post('/api/v1/register')
      .send({
        email: 'test@test.com',
        password: 'test1234'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res: any) {
        if (typeof res.body.userId === 'number') {
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
        email: 'test@test.com',
        password: 'test1234'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(function (res: any) {
        if (typeof res.body.user === 'object' && typeof res.body.token === 'string') {
          return true
        }
      })
      .expect(200, done)
  })
})
