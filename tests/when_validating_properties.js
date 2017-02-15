const expect = require('chai').expect
const mocha = require('mocha')

const JsonSchema = require('../lib')

describe('when validating schemas', () => {
  describe('with invalid primitive properties', () => {

    it('should define array property', () => {
      const simple = new JsonSchema('simple', {
        property: 'array'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

    it('should define boolean property', () => {
      const simple = new JsonSchema('simple', {
        property: 'boolean'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

    it('should define buffer property', () => {
      const simple = new JsonSchema('simple', {
        property: 'buffer'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

    it('should define date property', () => {
      const simple = new JsonSchema('simple', {
        property: 'date'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

    it('should define function property', () => {
      const simple = new JsonSchema('simple', {
        property: 'function'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

    it('should define number property', () => {
      const simple = new JsonSchema('simple', {
        property: 'number'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

    it('should define object property', () => {
      const simple = new JsonSchema('simple', {
        property: 'object'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

    it('should define string property', () => {
      const simple = new JsonSchema('simple', {
        property: 'string'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

    it('should define symbol property', () => {
      const simple = new JsonSchema('simple', {
        property: 'symbol'
      })
      expect(simple.schema.property.validate(null)).to.be.false
    })

  })

  describe('with valid primitive properties', () => {

    it('should define array property', () => {
      const simple = new JsonSchema('simple', {
        property: 'array'
      })
      expect(simple.schema.property.validate([])).to.be.true
    })

    it('should define boolean property', () => {
      const simple = new JsonSchema('simple', {
        property: 'boolean'
      })
      expect(simple.schema.property.validate(true)).to.be.true
    })

    it('should define buffer property', () => {
      const simple = new JsonSchema('simple', {
        property: 'buffer'
      })
      expect(simple.schema.property.validate(new Buffer('test'))).to.be.true
    })

    it('should define date property', () => {
      const simple = new JsonSchema('simple', {
        property: 'date'
      })
      expect(simple.schema.property.validate(new Date())).to.be.true
    })

    it('should define function property', () => {
      const simple = new JsonSchema('simple', {
        property: 'function'
      })
      expect(simple.schema.property.validate(() => {})).to.be.true
    })

    it('should define number property', () => {
      const simple = new JsonSchema('simple', {
        property: 'number'
      })
      expect(simple.schema.property.validate(10)).to.be.true
    })

    it('should define object property', () => {
      const simple = new JsonSchema('simple', {
        property: 'object'
      })
      expect(simple.schema.property.validate({})).to.be.true
    })

    it('should define string property', () => {
      const simple = new JsonSchema('simple', {
        property: 'string'
      })
      expect(simple.schema.property.validate('test')).to.be.true
    })

    it('should define symbol property', () => {
      const simple = new JsonSchema('simple', {
        property: 'symbol'
      })
      expect(simple.schema.property.validate(Symbol('test'))).to.be.true
    })

  })
})
