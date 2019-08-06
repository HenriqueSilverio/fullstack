const chai = require('chai')
const supertest = require('supertest')

const api = require('../api/api')

before(async () => {
  const instance = await api.start()
  global.expect = chai.expect
  global.request = supertest(instance)
  console.log('\n')
})
