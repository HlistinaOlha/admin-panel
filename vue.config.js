module.exports = {
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 4444
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/css/variables/variables.scss";`,
      }
    }
  }
};
