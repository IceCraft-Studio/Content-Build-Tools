const Fs = require('node:fs');
const Path = require('node:path');

async function readdirRecursive(path, callback) {
    const files = Fs.readdirSync(path, { withFileTypes: true });
    for (const fileObject of files) {
        if (fileObject.isDirectory()) {
            await readdirRecursive(Path.join(path, fileObject.name), callback);
        }
        if (fileObject.isFile()) {
            await callback(Path.join(path, fileObject.name));
        }
    }
}

module.exports = { readdirRecursive };