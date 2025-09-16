const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // enable below for use on production and add this to index.html <base href="https://cdn.jsdelivr.net/">
  publicPath: 'https://cdn.jsdelivr.net/gh/IONTeknologiINA/brpl-red-cdn@master/dist',
})
