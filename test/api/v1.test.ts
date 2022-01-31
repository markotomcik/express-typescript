import request from 'supertest'
import { describe, it } from 'mocha'

import app from '../../src/app'

describe('GET /api/v1', () => {
  it('responds with a json message', (done: any) => {
    request(app)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, {
        message: 'V1 API'
      }, done)
  })
})
