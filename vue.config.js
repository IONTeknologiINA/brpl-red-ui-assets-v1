const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // enable below if wanna use for production
  publicPath: 'https://cdn.jsdelivr.net/',
  assetsDir: 'gh/annassdan/red/dist/'
})
