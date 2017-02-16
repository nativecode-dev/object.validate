# object.validate

[![npm](https://img.shields.io/npm/v/object.validate.svg?style=flat-square)](https://www.npmjs.com/package/object.validate)
[![TeamCity](https://img.shields.io/teamcity/https/build.nativecode.com/s/objectvalidate_continuous.svg?style=flat-square)](https://build.nativecode.com/viewType.html?buildTypeId=objectvalidate_continuous&guest=1)

No-frills node module to perform validations. There are no fancy regex and match properties. The schema is
kept purposefully minimal to only a few properties. Anything fancier can be done by a custom validator
function.

- Define a property with a simple string value representing the type: `property: <type>`.
- Define a property with a simple validation function: `property: <function>`.
- Define an object literal that accepts `required`, `type`, or `validator` function.
```javascript
property: {
  required: <boolean>,
  type: <type>,
  validate: <function>
}
```

## Installation
```
npm install --save object.validate
```

## Usage
```javascript
const JsonSchema = require('object.validate')
const schema = new JsonSchema({
  address: {
    line1: 'string', // We can define just the type we want.
    line2: {
      type: 'string' // We can also define an object literal with properties.
    },
    state: {
      type: 'string',
      validator: (value) => {
        return value.length === 2 // We can define a custom validator to verify specific values.
      }
    },
    zipcode: {
      required: true, // We can tell the validator that we want it to be required.
      type: 'numer'
    }
  }
})
```

## Custom Validator
Custom validators take the form of: `(value, istype)`, where `istype` is the `is-type` node library. You can
pass a validator function directly when assigning the schema or use the `vaidator` property in an object
literal.

NOTE: When used directly, you must check the type yourself.

```javascript
// Direct assignment to schema property.
property: (value, istype) => {
  if (istype.string(value)) {
    return value.length > 0
  }
  return false
}

// Object literal assignment to schema property.
property: {
  type: 'string',
  validator: (value) => {
    return value.length > 0
  }
}
```
