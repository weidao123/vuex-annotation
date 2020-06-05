const path = require("path");

module.exports = {
    publicPath: './',
    chainWebpack: config => {
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./example/main.ts')
        });
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./example/main.ts')
        })
    }
};
