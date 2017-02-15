const debug = require('debug')('object.validate:property')
const is = require('is-type')

class Property {
  constructor(name, definition) {
    this.name = name

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
    return this.validator(value)
  }
}

module.exports = Property
