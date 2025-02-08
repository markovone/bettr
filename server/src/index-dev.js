require('ignore-styles')

require('@babel/register')({
    ignore: [ /node_modules/ ],
    presets: [ 
        [ '@babel/preset-env', { targets: { node: 'current' } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ]
    ],
})


require('./index.js')