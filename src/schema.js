const debug = require('debug')('object.validate:schema')
const is = require('is-type')

const Property = require('./property')

const define = (schema, parts) => {
  let pathparts = parts || []
  Object.keys(schema).forEach(property => {
    const value = schema[property]
    if (is.object(value) && is.undefined(value.type)) {
      pathparts.push(property)
      return define(value, pathparts)
    }
    schema[property] = new Property(property, value, pathparts)
  })

  return schema
}

class JsonSchema {
  constructor(name, schema) {
    this.name = name
    this.schema = define(schema)

    debug('defined schema: %s (%O)', this.name, this.schema)
  }

  validate(value, schema) {
    const self = this
    let current = schema || this.schema
    return !Object.keys(current).some(name => {
      const property = current[name]
      if (is.function(property.validator)) {
        return property.validate(value[name]) === false
      }
      return self.validate(value[name], property) === false
    })
  }
}

module.exports = JsonSchema
