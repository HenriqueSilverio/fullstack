const chai = require('chai')
const supertest = require('supertest')

const api = require('../api/api')

before(async () => {
  await api.start()
  global.expect = chai.expect
  global.request = supertest(api.instance)
  console.log('\n')
})
