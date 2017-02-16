const debug = require('debug')('object.validate:property')
const is = require('is-type')

class Property {
  constructor(name, definition, pathparts) {
    this.name = name
    this.path = pathparts.length ? pathparts.join('.') : '.'

    if (is.string(definition)) {
      this.type = definition
      this.validator = is[this.type]
    } else if (is.function(definition)) {
      this.type = 'validator'
      this.validator = definition
    } else {
      this.required = definition.required || false
      this.type = definition.type
      this.validator = definition.validator || is[this.type]
    }

    debug('defined property: %s (%s)', this.name, this.type)
  }

  validate(value) {
    if (this.required && is.nullOrUndefined(value)) {
      return false
    } else if (is.nullOrUndefined(value)) {
      return true
    }

    if (this.type !== 'validator' && is[this.type](value) === false) {
      return false
    }

    if (is.function(this.validator)) {
      return this.validator(value, is)
    }

    return true
  }
}

module.exports = Property
