const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// const AnalyzerMode = function() {
//   return process.env.NODE_ENV === 'production' ? 'disabled' : 'server';
// };

module.exports = {
  configureWebpack: {
    mode: 'production',
    devServer: {
      disableHostCheck: true
    },
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      }
    },
    performance: {
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    plugins: [
      new BundleAnalyzerPlugin({
        // analyzerMode: AnalyzerMode(),
        openAnalyzer: false,
        generateStatsFile: true
      })
    ]
  }
}