# Refractile

Configuration framework for compiling and coordinating polyglossic middleware in [Express](https://github.com/expressjs/express) using [WebAssembly](https://webassembly.org/).

![NPM Version][npm-version-image]
![NPM Install Size][npm-install-size-image]
![NPM Downloads][npm-downloads-image]

[npm-downloads-image]: https://badgen.net/npm/dm/refractile
[npm-downloads-url]: https://npmcharts.com/compare/refractile?minimal=true
[npm-install-size-image]: https://badgen.net/packagephobia/install/refractile
[npm-install-size-url]: https://packagephobia.com/result?p=refractile
[npm-url]: https://npmjs.org/package/refractile
[npm-version-image]: https://badgen.net/npm/v/refractile

## Overview

**_Refractile_**: _"...capable of refraction"_

[- Merriam Webster](https://www.merriam-webster.com/dictionary/refractile)

With this package, you gain the ability to refract server-side functionality when using Express through the many prisms of other languages. In other words, when you choose to use Express, which is fast, lightweight, and quick to spin up, you can still make use of the benefit of languages other than JavaScript.

While so much of web development has become monoglossic as JavaScript cotinues its imposing march from the frontend to the backend, with Refractile you can experience a best-of-all-worlds developer experience. You could write functionality that benefits from the speed of C or the affordances of some particular package for Go all while still organizing your server in the lightweight, efficient context of Express JS.

## Installation

Make sure you have [Node.js](https://nodejs.org/en/) installed before you begin.

You can install refractile into your project using [npm](https://www.npmjs.com/).

```console

$ npm install refractile

```

## Core Concepts

The two core concepts to understand when working with this package are its configuration system and the function `refract` itself.

### The function

The interface for `refract` is simple: it takes two arguments — a reference to a module and a function on that module to be invoked. As an exmaple, this would look as follows:

```js

refract('some_module', 'some_function');

```
<br/>

Simple!

`refract` returns an express middleware function, in other words a function that expects a Request object, a Response object, and a Next function. These are the arguments that will be fed into the function requested on the module, which, in the example above, would be `some-function`.

`refract` works with WebAssembly under the hood; currently, it requires JavaScript glue code to run. In the example above `some_module` would be associated with a file called `some_module.js` that is responsible for instantiating `some_module.wasm`. The point of this package is to organize the compilation of `.wasm` files and, in some cases, `.js` glue code as express middleware.

### The configuration

The function `refract` works with a configuration file called `refractile.config.js`. For `refract` to work, _you must also create and configure `refractile.config.js`_.

The configuration should look as follows:

```js

module.exports = {
    preload_cmds: [ ] // This is an array of strings representing commands that will run when the configuration is loaded. Use it to create or copy any resources that your modules will depend on

    modules: { // This object contains the unique configurations for each module you want to include

        some_module: { // The name of the module is organized by this key

            bin: "./some_folder", // (Required) The folder where refractile will look for the JS module

            make: " ", // (Required) The command to be evaluated for building sources into WASM modules

            src: " ", // The path to the source code. Refract will use this reference to determine if the module needs to be rebuilt after the code updates.

            gluecode_src: " " // If your compiler does not generate WebAssembly gluecode, you can write your own. When you point to it with this option, it will be copied into the bin folder with a name matching the module key (e.g. some_module) and a .js extension after the .wasm file was compiled.
        },

        // Other modules should be configured similarly
        some_other_module: { ... }
    }
};

```

## Example

You can find a project making use of `refractile` [here](https://github.com/BufoOs/refractile-example).

The example app showcases two ways of working with this package — one where a given WebAssembly compiler generates gluecode and one where custom gluecode is written by the developer and pointed to in the configuration file.

The app itself benchmarks the performance of a recursive algorithm that calculates the nth value of the fibonacci series in Go and C++ against the equivalent implementation in JavaScript

### Example dependencies

To run the project, you must have the following dependencies installed:

- [Node.js](https://nodejs.org/en/)
- [emcc](https://emscripten.org/docs/tools_reference/emcc.html), a compiler front-end developed as part of the [emscripten project](https://emscripten.org/index.html)
- [go](https://go.dev/doc/install)
- [tinygo](https://tinygo.org/getting-started/install/)

### To run the example

After installing the above dependencies, install node packages by running `npm i`

Then run the command `npm start` to build the front-end, compile the WebAssembly modules, and start the server.
