import * as fs from 'fs';
import * as path from 'path';

const base64regex: RegExp = /^data:([A-Za-z-+\/]+);base64,(.+)$/;
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const defaultFileOptions = { filePath: './uploads', types: ['jpg', 'jpeg', 'png'], randomizeFileNameLength: 10 };

const typesArrayToRegex = async (types: string[]) => {
  const typesToString = await Promise.all(
    types.map((type, index) => (index === types.length - 1 ? `${type}` : `${type}|`)),
  );
  const regex = new RegExp(`/(?<=\S+)\.(${typesToString})/gi`);
  return regex;
};

const decodeBase64 = async (base64: string) => {
  const matches = base64.match(base64regex);

  if (!matches || matches.length !== 3) {
    return null;
  }
  return { type: matches[1], buffer: Buffer.from(matches[2], 'base64') };
};

const fileTypeControl = async (base64Type: string, types: string[]) => {
  if (types.length === 0) return true;

  const validateRegex = await typesArrayToRegex(types);
  return validateRegex.test(base64Type);
};

const createRandomFileName = async (randomizeFileNameLength: number, fileExtention: string) => {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < randomizeFileNameLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return `${result}.${fileExtention}`;
};

const writeBase64ToDisk = async (base64Buffer: Buffer, options: any) => {
  let { fileName } = options;
  const { randomizeFileNameLength, fileExtention, filePath } = options;

  try {
    fileName = fileName
      ? `${fileName}.${fileExtention}`
      : await createRandomFileName(randomizeFileNameLength, fileExtention);
    if (fs.statSync(path.resolve(filePath)).isDirectory()) {
      await fs.promises.writeFile(path.resolve(filePath, fileName), base64Buffer, { encoding: 'base64' });
      return { status: true, data: fileName, message: 'File created.' };
    }
    return { status: false, data: null, message: 'No such file or directory' };
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      return { status: false, data: null, message: 'No such file or directory' };
    } else {
      return { status: false, data: null, message: e.message };
    }
  }
};
async function base64toFile(
  base64: string,
  options: {
    types?: string[];
    fileName?: string;
    randomizeFileNameLength?: number;
    filePath?: string;
    fileMaxSize?: number;
  } | null,
) {
  return new Promise(async (resolve, reject) => {
    try {
      options = Object.assign({}, defaultFileOptions, options);
      const decodedBase64 = await decodeBase64(base64);
      if (!decodedBase64) {
        return reject(new Error('Invalid base64 string!'));
      }
      if (options.fileMaxSize && decodedBase64.buffer.toString().length > options.fileMaxSize) {
        return reject(new Error('File too large!'));
      }

      if (options.types && !fileTypeControl(decodedBase64.type, options.types)) {
        return reject(new Error('Invalid file type!'));
      }
      const createdFile = await writeBase64ToDisk(decodedBase64.buffer, {
        ...options,
        fileExtention: decodedBase64.type.split('/')[1],
      });
      if (createdFile.status) {
        return resolve(createdFile.data);
      } else {
        return reject(new Error(createdFile.message));
      }
    } catch (e: any) {
      return reject(new Error(e.message));
    }
  });
}

export default base64toFile;
// For CommonJS default export support
module.exports = base64toFile;
module.exports.default = base64toFile;
