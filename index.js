const zlib = require('zlib')
    // console.log(zlib);
const fs = require('fs')

const denodeify = require('then-denodeify')
const promiseMap = require('p-map')
const glob = denodeify(require('glob'))

module.exports = function brotliAllFiles(path, options) {
    return glob(path, options).then(files => {
        return promiseMap(files, brotliFile, {
            concurrency: 5
        })
    })
}

function brotliFile(file) {
    return new Promise((resolve, reject) => {
        const brotli = zlib.createBrotliCompress()
        const brotliFileName = file + '.br'

        fs.createReadStream(file)
            .on('error', reject)
            .pipe(brotli)
            .pipe(fs.createWriteStream(brotliFileName))
            .on('finish', () => resolve(brotliFileName))
    })
}