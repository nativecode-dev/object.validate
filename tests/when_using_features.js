const expect = require('chai').expect
const mocha = require('mocha')

const JsonSchema = require('../lib')

describe('when using features', () => {
  describe('custom function validator only', () => {
    const custom = new JsonSchema({
      range: (value, is) => {
        if (is.number(value) === false) {
          return false
        }
        return value > 0 && value < 100
      }
    })

    it('should validate with only custom function', () => {
      const valid = {
        range: 99
      }
      expect(custom.validate(valid)).to.be.true
    })
  })

  describe('custom function validator', () => {
    const custom = new JsonSchema({
      range: {
        type: 'number',
        validator: value => value > 0 && value < 100
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

  describe('custom function validator that returns a RegExp object', () => {
    const custom = new JsonSchema({
      value: () => /\d+/
    })

    const invalid = {
      value: 'abcdef'
    }

    const valid = {
      value: '123456'
    }

    it('should fail regex validation', () => {
      expect(custom.validate(invalid)).to.be.false
    })

    it('should pass regex validation', () => {
      expect(custom.validate(valid)).to.be.true
    })
  })
})
