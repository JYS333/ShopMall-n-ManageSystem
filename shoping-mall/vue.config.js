const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint自动校验工具
  lintOnSave: false,
  devServer:{
    proxy:{
      "/api":{
        target: "http://gmall-h5-api.atguigu.cn",
      }
    }
  }
})
