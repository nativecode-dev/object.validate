const debug = require('debug')('object.validate:schema')
const is = require('is-type')

const Property = require('./property')

const define = schema => {
  Object.keys(schema).forEach(property => {
    const value = schema[property]
    if (is.object(value) && is.undefined(value.type)) {
      return define(value)
    }
    schema[property] = new Property(property, value)
  })

  return schema
}

class JsonSchema {
  constructor(name, schema) {
    this.name = name
    this.schema = define(schema)

    debug('defined schema: %s (%O)', this.name, this.schema)
  }

  validate(value) {
    return false
  }
}

module.exports = JsonSchema
