const expect = require('chai').expect
const mocha = require('mocha')

const JsonSchema = require('../lib')

describe('when validating objects', () => {
  const deep = new JsonSchema('deep', {
    address: {
      line1: 'string',
      line2: 'string',
      city: 'string',
      state: {
        full: 'string',
        short: {
          type: 'string',
          validator: value => {
            return value.length === 2
          }
        }
      },
      zipcode: {
        type: 'number',
        validator: value => {
          return value > 0 && value <= 99999
        }
      }
    }
  })

  describe('that are deeply nested with all features', () => {
    const invalid = {
      address: {
        line1: 123,
        line2: 'Suite 456',
        city: 'Some City',
        state: {
          full: 'Some State',
          short: 'SS'
        },
        zipcode: '12345'
      }
    }

    const valid = {
      address: {
        line1: '123 Some Street',
        line2: 'Suite 456',
        city: 'Some City',
        state: {
          full: 'Some State',
          short: 'SS'
        }
      }
    }

    it('should fail validation', () => {
      expect(deep.validate(invalid)).to.be.false
    })

    it('should validate properly', () => {
      expect(deep.validate(valid)).to.be.true
    })
  })
})
