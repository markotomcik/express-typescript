import request from 'supertest'
import { describe, it } from 'mocha'

import app from '../src/app'

describe('app', () => {
  it('responds with a not found message', (done: any) => {
    request(app)
      .get('/what-is-this-even')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  })
})

describe('GET /', () => {
  it('responds with 200 OK', (done: any) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'Welcome to the API'
      }, done)
  })
})
