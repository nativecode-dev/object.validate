const debug = require('debug')('object.validate:property')
const is = require('is-type')

class Property {
  constructor(name, definition, pathparts) {
    this.name = name
    this.path = pathparts ? pathparts.join('.') : '.'

    if (is.string(definition)) {
      this.type = definition
    } else {
      this.required = definition.required || false
      this.type = definition.type
    }

    this.validator = definition.validator || is[this.type]

    debug('defined property: %s (%s)', this.name, this.type)
  }

  validate(value) {
    if (this.required && is.nullOrUndefined(value)) {
      return false
    } else if (is.nullOrUndefined(value)) {
      return true
    }

    if (is[this.type](value) === false) {
      return false
    }

    if (is.function(this.validator)) {
      return this.validator(value)
    }

    return true
  }
}

module.exports = Property
