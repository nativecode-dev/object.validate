const expect = require('chai').expect
const mocha = require('mocha')

const JsonSchema = require('../lib')

describe('when using features', () => {
  describe('custom function validator', () => {
    const custom = new JsonSchema({
      range: {
        type: 'number',
        validator: value => {
          return value > 0 && value < 100
        }
      }
    })

    it('should fail to validate custom range', () => {
      const invalid = {
        range: 101
      }
      expect(custom.validate(invalid)).to.be.false
    })

    it('should validate custom range', () => {
      const valid = {
        range: 10
      }
      expect(custom.validate(valid)).to.be.true
    })
  })
})
