# Node Base64 to File

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
base64toFile(
    base64String,
    { filePath: './uploads', fileName: "image", types: ['png'], fileMaxSize: 3145728 },
    (imgPath, error) => {
      if(error) {
          console.log(error.message)
      }
      console.log(imgPath)
    },
  );

// create an image with the a random name
base64toFile(
    base64String,
    { filePath: './uploads', randomizeFileNameLength: 14, types: ['png'], fileMaxSize: 3145728 },
    (imgPath, error) => {
      if(error) {
          console.log(error.message)
      }
      console.log(imgPath)
    },
  );
...

```

## Authors

Aziz ALKAN - [azzlkn](https://github.com/azzlkn)

<!-- Feel free to include a CONTRIBUTORS.md file and modify this contributors secion -->
<!-- See also the list of [contributors](CONTRIBUTORS) who participated in this project. -->

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
