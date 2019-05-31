#!/usr/bin/env node

const brotliAll = require('./index')

const path = process.argv[2]

brotliAll(path)
    .then(brotliFiles => console.log('brotli', brotliFiles.length, 'files'))
    .catch(err => console.error(err))