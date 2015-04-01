# MongoDB Require

Function `require` compatible with [node.js](http://nodejs.org "Node.js").

## Why?

In Mongodb `include` used for loading dependencies.
It puts all modules to global scope. With `require` it could be avoided.

## Install

`bower i mongo-require`

## Example

```js
include('lib/require.js)';

var module = require('some_module');

someModule();
```

## See Also

- [require for Extend Script](https://github.com/coderaiser/es-require "ES Require")

## License

MIT
