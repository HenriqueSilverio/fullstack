const jwt = require('jsonwebtoken')

const User = require('../../api/users/model')

let admin = {}
let user = {}
let adminToken = ''
let userToken = ''

describe('Users resource', () => {
  beforeEach(async () => {
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
  describe('POST /api/v1/users', () => {
    it('Creates a new user', done => {
      request.post('/api/v1/users')
        .send({
          email: 'guest@server.com',
          password: 'secret',
          role: 'user'
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err) }
          expect(res.body).to.have.nested.property('data.id')
          done()
        })
    })
  })
  describe('GET /api/v1/users', () => {
    describe('As a admin', () => {
      it('Can view all users', done => {
        request.get('/api/v1/users')
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
          .end((err, res) => {
            if (err) { return done(err) }
            expect(res.body).to.includes.keys('data')
            expect(res.body.data).to.be.an('array')
            expect(res.body.data).to.have.lengthOf(2)
            done()
          })
      })
    })
    describe('As a user', () => {
      it('Cant view all users', done => {
        request.get('/api/v1/users')
          .set('Authorization', `Bearer ${userToken}`)
          .expect(403)
          .end((err, res) => {
            if (err) { return done(err) }
            expect(res.body).to.include.keys('status', 'message', 'stack')
            done()
          })
      })
    })
  })
  describe('GET /api/v1/users/:id', () => {
    describe('As a admin', () => {
      it('Can view my own profile', done => {
        request.get(`/api/v1/users/${admin.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
          .end((err, res) => {
            if (err) { return done(err) }
            expect(res.body).to.includes.keys('data')
            expect(res.body.data).to.be.an('object')
            done()
          })
      })
      it('Can view others profile', done => {
        request.get(`/api/v1/users/${user.id}`)
          .set('Authorization', `Bearer ${adminToken}`)
          .expect(200)
          .end((err, res) => {
            if (err) { return done(err) }
            expect(res.body).to.includes.keys('data')
            expect(res.body.data).to.be.an('object')
            done()
          })
      })
    })
    describe('As a user', () => {
      it('Can view my own profile', done => {
        request.get(`/api/v1/users/${user.id}`)
          .set('Authorization', `Bearer ${userToken}`)
          .expect(200)
          .end((err, res) => {
            if (err) { return done(err) }
            expect(res.body).to.includes.keys('data')
            expect(res.body.data).to.be.an('object')
            done()
          })
      })
      it('Cant view others profile', done => {
        request.get(`/api/v1/users/${admin.id}`)
          .set('Authorization', `Bearer ${userToken}`)
          .expect(403)
          .end((err, res) => {
            if (err) { return done(err) }
            expect(res.body).to.include.keys('status', 'message', 'stack')
            done()
          })
      })
    })
  })
})
