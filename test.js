require('hard-rejection')()
const assert = require('power-assert')
const rimraf = require('rimraf')
const brotliAll = require('./')
const glob = require('glob')

function cleanUp() {
    rimraf(`./fixtures/*.br`, err => {
        assert.ifError(err)
    })
}

brotliAll(`./fixtures/*.@(md|txt)`).then(brotliFiles => {
    assert.equal(brotliFiles.length, 5)
    glob(`./fixtures/*.br`, (err, brotliFiles) => {
        assert.ifError(err)
        assert.equal(brotliFiles.length, 5)
        cleanUp()
    })
}).catch(err => {
    assert.ifError(err)
    cleanUp()
})