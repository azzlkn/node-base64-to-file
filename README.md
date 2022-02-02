# Node Base64 to File

[![npm version](https://img.shields.io/npm/v/node-base64-to-file.svg?style=flat-square)](https://www.npmjs.com/package/node-base64-to-file)
[![npm downloads](https://img.shields.io/npm/dm/node-base64-to-file.svg?style=flat-square)](https://www.npmjs.com/package/node-base64-to-file)

**node-base64-to-file** is a light weight javascript `base64 string to file` conversion library for nodejs.

## Getting Started

### Installation

```bash
# for npm use:
npm install --save node-base64-to-file

# for yarn use:
yarn add node-base64-to-file
```

To include **_node-base64-to-file_** in your project. use one of these:

```js
// ES6 and later
import base64toFile from 'node-base64-to-file';

// ES5 and older
const base64toFile = require('node-base64-to-file');
```

## Usage

```javascript
const base64toFile = require("node-base64-to-file");

const base64String =
  'data:image/png;base64,iVBORw0KGgo...';

// create an image with the a given name ie 'image'
try {
  const imagePath = await base64toFile(base64String, { filePath: './uploads', fileName: "image", types: ['png'], fileMaxSize: 3145728 });
  console.log(imagePath)
} catch (error) {
  console.log(error)
}

// create an image with the a random name
try {
  const imagePath = await base64toFile(base64String, { filePath: './uploads', randomizeFileNameLength: 14, types: ['png'], fileMaxSize: 3145728 });
  console.log(imagePath)
} catch (error) {
  console.log(error)
}

// alternative usage
base64toFile(base64String, { filePath: './uploads', fileName: "image", types: ['png'], fileMaxSize: 3145728 }).then(
    (imagePath) => {
      console.log(imagePath)
    },
    (error) => {
      console.log(error.message)
    },
  );
...

```

## Arguments

- `base64String` - This is a required filed which is simply an file in base64 representation
- `option` - This is **optional** and can be `one` or `all` of the following properties
  - `filePath` {string} - The directory path - Default: `./uploads`.
  - `fileName` {string} - The name of the file excluding the extension - Default random name.
  - `randomizeFileNameLength` {number} - Number of characters for the name to be created
  - `types` {array} - Valid extensions e.g ['png','jpg','pdf'] - Default: ['jpg', 'jpeg', 'png']
  - `fileMaxSize` {number} - the maximum number of bytes to base64 e.g 3145728

## Authors

Aziz ALKAN - [azzlkn](https://github.com/azzlkn)

<!-- Feel free to include a CONTRIBUTORS.md file and modify this contributors secion -->
<!-- See also the list of [contributors](CONTRIBUTORS) who participated in this project. -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
