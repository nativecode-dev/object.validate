const expect = require('chai').expect
const mocha = require('mocha')

const JsonSchema = require('../lib')

describe('when defining schemas', () => {
  describe('with primitive properties', () => {

    it('should define array property', () => {
      const simple = new JsonSchema('simple', {
        property: 'array'
      })
      expect(simple.schema.property.type).to.be.equal('array')
    })

    it('should define boolean property', () => {
      const simple = new JsonSchema('simple', {
        property: 'boolean'
      })
      expect(simple.schema.property.type).to.be.equal('boolean')
    })

    it('should define buffer property', () => {
      const simple = new JsonSchema('simple', {
        property: 'buffer'
      })
      expect(simple.schema.property.type).to.be.equal('buffer')
    })

    it('should define date property', () => {
      const simple = new JsonSchema('simple', {
        property: 'date'
      })
      expect(simple.schema.property.type).to.be.equal('date')
    })

    it('should define function property', () => {
      const simple = new JsonSchema('simple', {
        property: 'function'
      })
      expect(simple.schema.property.type).to.be.equal('function')
    })

    it('should define number property', () => {
      const simple = new JsonSchema('simple', {
        property: 'number'
      })
      expect(simple.schema.property.type).to.be.equal('number')
    })

    it('should define object property', () => {
      const simple = new JsonSchema('simple', {
        property: 'object'
      })
      expect(simple.schema.property.type).to.be.equal('object')
    })

    it('should define string property', () => {
      const simple = new JsonSchema('simple', {
        property: 'string'
      })
      expect(simple.schema.property.type).to.be.equal('string')
    })

    it('should define symbol property', () => {
      const simple = new JsonSchema('simple', {
        property: 'symbol'
      })
      expect(simple.schema.property.type).to.be.equal('symbol')
    })

  })
})
