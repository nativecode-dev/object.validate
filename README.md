# object.validate

[![npm](https://img.shields.io/npm/v/object.validate.svg?style=flat-square)](https://www.npmjs.com/package/object.validate)
[![Travis](https://img.shields.io/travis/nativecode-dev/object.validate.svg?style=flat-square&label=travis)](https://travis-ci.org/nativecode-dev/object.validate)
[![TeamCity](https://img.shields.io/teamcity/https/build.nativecode.com/s/objectvalidate_continuous.svg?style=flat-square&label=teamcity)](https://build.nativecode.com/viewType.html?buildTypeId=objectvalidate_continuous&guest=1)
[![David](https://img.shields.io/david/nativecode-dev/object.validate.svg?style=flat-square&label=deps)](https://www.npmjs.com/package/object.validate)
[![David](https://img.shields.io/david/dev/nativecode-dev/object.validate.svg?style=flat-square&label=devdeps)](https://www.npmjs.com/package/object.validate)

No-frills node module to perform validations. There are no fancy regex and match properties. The schema is
kept purposefully minimal to only a few properties. Anything fancier can be done by a custom validator
function.

- Define a short-hand property with a simple string value representing the type: `property: <type>`.
- Define a short-hand property with a simple validation function: `property: <function>`.
- Define an object literal that accepts `required`, `type`, or `validator` function.

# Installation
```
npm install --save object.validate
```

# Usage
```javascript
const JsonSchema = require('object.validate')

const definition = new JsonSchema({
  // Define a custom validator to validate type and value.
  id: (value, is) => is.number(value) && id > 0,
  // Define a simple type string. Property is not required by default.
  message: 'string',
  // Define an object literal with bells and whistles.
  date: {
    required: true,
    type: 'date',
    validator: value => value <= new Date()
  },
  data: {
    text: 'string'
  }
})

const valid = {
  id: 123,
  message: 'test',
  date: new Date(),
  data: {
    text: 'test'
  }
}

// Validate the entire object.
const good = definition.validate(valid)

// Validate individual properties.
definition.schema.id.validate(valid)
definition.schema.message.validate(valid)
definition.schema.date.validate(valid)
definition.schema.data.text.validate(valid.data)
```

## Validation Rules
| Order | Rules                                                           | Result                  |
|:-----:|-----------------------------------------------------------------|:-----------------------:|
| 1     | If `required` is `true` and the value is `null` or `undefined`  | `false`                 |
| 2     | If `required` is `false` and the value is `null` or `undefined` | `true`                  |
| 3     | If `type` is not `validator` and the `is-type` check fails      | `false`                 |
| 4     | If `validator` is a `function`                                  | `validator` result      |
| 5     | If `validator` result is a `RegExp` object                      | `test` result           |
| 6     | Default                                                         | `true`                  |

## Simple Type
You can pass a type string defined by the simple [`is`](https://www.npmjs.com/package/is) library
rather than passing an object literal.
```javascript
const schema = new JsonSchema({
  name: 'string',
  age: 'number',
  birth: 'date'
})
```

## Simple Validator
Custom validators take the form of: `(value, is)`, where `is` is the
[`is`](https://www.npmjs.com/package/is) node library. You can pass a validator function inline
when assigning the schema or use the `validator` property in an object literal.

NOTE: When used inline, you must check the type yourself.

```javascript
// Inline property validator.
property: (value, is) => is.string(value) && value.length > 0

// Object literal property.
property: {
  type: 'string',
  validator: value => value.length > 0
}
```

# License
Copyright 2017 NativeCode Development <support@nativecode.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without
limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
