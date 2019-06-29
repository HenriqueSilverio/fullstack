const jwt = require('jsonwebtoken')

const User = require('../api/users/model')

let admin = {}
let user = {}
let adminToken = ''
let userToken = ''

describe('', () => {
  before(async () => {
    await User.deleteMany({})
    const users = await User.create([
      { email: 'admin@server.com', password: 'secret', role: 'admin' },
      { email: 'user@server.com', password: 'secret', role: 'user' }
    ])
    admin = users[0]
    user = users[1]
    adminToken = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '30m' })
    userToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '30m' })
  })
  describe('POST /api/v1/users', () => {})
  describe('GET /api/v1/users', () => {
    describe('As a admin', () => {
      it('Can view all users', done => {
        request.get('/api/v1/users')
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200, done)
      })
    })
    describe('As a user', () => {
      it('Cant view all users', done => {
        request.get('/api/v1/users')
          .set('Authorization', `Bearer ${userToken}`)
          .expect(403, done)
      })
    })
  })
  describe('GET /api/v1/users/:id', () => {
    describe('As a admin', () => {
      it('Can view my own profile', done => {
        request.get(`/api/v1/users/${admin.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200, done)
      })
      it('Can view others profile', done => {
        request.get(`/api/v1/users/${user.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200, done)
      })
    })
    describe('As a user', () => {
      it('Can view my own profile', done => {
        request.get(`/api/v1/users/${user.id}`)
          .set('Authorization', `Bearer ${userToken}`)
          .expect(200, done)
      })
      it('Cant view others profile', done => {
        request.get(`/api/v1/users/${admin.id}`)
          .set('Authorization', `Bearer ${userToken}`)
          .expect(403, done)
      })
    })
  })
})
