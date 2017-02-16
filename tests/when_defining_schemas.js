const expect = require('chai').expect
const mocha = require('mocha')

const JsonSchema = require('../lib')

describe('when defining schemas', () => {
  describe('with single path properties', () => {

    it('should define array property', () => {
      const simple = new JsonSchema({
        property: 'array'
      })
      expect(simple.schema.property.type).to.be.equal('array')
    })

    it('should define boolean property', () => {
      const simple = new JsonSchema({
        property: 'boolean'
      })
      expect(simple.schema.property.type).to.be.equal('boolean')
    })

    it('should define buffer property', () => {
      const simple = new JsonSchema({
        property: 'buffer'
      })
      expect(simple.schema.property.type).to.be.equal('buffer')
    })

    it('should define date property', () => {
      const simple = new JsonSchema({
        property: 'date'
      })
      expect(simple.schema.property.type).to.be.equal('date')
    })

    it('should define function property', () => {
      const simple = new JsonSchema({
        property: 'function'
      })
      expect(simple.schema.property.type).to.be.equal('function')
    })

    it('should define number property', () => {
      const simple = new JsonSchema({
        property: 'number'
      })
      expect(simple.schema.property.type).to.be.equal('number')
    })

    it('should define object property', () => {
      const simple = new JsonSchema({
        property: 'object'
      })
      expect(simple.schema.property.type).to.be.equal('object')
    })

    it('should define string property', () => {
      const simple = new JsonSchema({
        property: 'string'
      })
      expect(simple.schema.property.type).to.be.equal('string')
    })

    it('should define symbol property', () => {
      const simple = new JsonSchema({
        property: 'symbol'
      })
      expect(simple.schema.property.type).to.be.equal('symbol')
    })

  })

  describe('with a property graph', () => {
    it('should navigate property graph', () => {
      const graph = new JsonSchema({
        property: {
          level1: {
            level2: {
              level3: 'string'
            }
          }
        }
      })
      expect(graph.schema.property.level1.level2.level3.path).to.be.equal('property.level1.level2')
    })
  })
})
