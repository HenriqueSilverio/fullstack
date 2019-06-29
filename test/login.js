const User = require('../api/users/model')

describe('POST /login', () => {
  before(async () => {
    await User.deleteMany({})
    await User.create({ email: 'admin@server.com', password: 'secret', role: 'admin' })
  })
  describe('Success', () => {
    it('Returns authenticated user token', done => {
      request.post('/api/v1/login')
        .send({
          email: 'admin@server.com',
          password: 'secret'
        })
        .expect(200)
        .end((err, res) => {
          if (err) { return done(err) }
          expect(res.body).to.have.nested.property('data.token')
          done()
        })
    })
  })
  describe('Failure', () => {
    it('Deny access if email not exist', done => {
      request.post('/api/v1/login')
        .send({
          email: 'invalid',
          password: 'secret'
        })
        .expect(401)
        .end((err, res) => {
          if (err) { return done(err) }
          expect(res.body).to.include.keys('errors')
          done()
        })
    })
    it('Deny access if password dont match', done => {
      request.post('/api/v1/login')
        .send({
          email: 'admin@server.com',
          password: 'invalid'
        })
        .expect(401)
        .end((err, res) => {
          if (err) { return done(err) }
          expect(res.body).to.include.keys('errors')
          done()
        })
    })
    it('Deny access to blank email and password', done => {
      request.post('/api/v1/login')
        .expect(401)
        .end((err, res) => {
          if (err) { return done(err) }
          expect(res.body).to.include.keys('errors')
          done()
        })
    })
  })
})
