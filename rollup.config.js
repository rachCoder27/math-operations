// uglify handles only es5 code, so this also acts as smoke test against shipping es2015+ syntax
import {
    uglify
} from 'rollup-plugin-uglify';

import babel from 'rollup-plugin-babel';
import pkg from './package.json';

// var uglify = require('rollup-plugin-uglify').uglify;
// var pkg = require('./package.json');
// var babel = require('rollup-plugin-babel');

var banner = '//  Ramda v' + pkg.version + '\n' +
    '//  https://github.com/ramda/ramda\n' +
    '//  (c) 2013-' + new Date().getFullYear() + ' Scott Sauyet, Michael Hurley, and David Chambers\n' +
    '//  Ramda may be freely distributed under the MIT license.\n';

var input = 'source/index.js';
var productionEnv = process.env.NODE_ENV === 'production';
var config = {
    input: input,
    output: {
        file: productionEnv ? 'dist/mathoperations.min.js' : 'dist/mathoperations.js',
        format: 'umd',
        name: 'mathOperations',
        exports: 'named',
        banner: banner
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        productionEnv && uglify({
            compress: {
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
            },
            warnings: false
        })
    ]
};

export default config;