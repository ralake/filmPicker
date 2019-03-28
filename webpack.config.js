const webpack = require('webpack')
const config = require('config')

const APP_DIR = `${__dirname}/app/client`
const BUILD_DIR = `${__dirname}/public`

const env = process.env.NODE_ENV || 'development'

console.log(env, env === 'production')

module.exports = {
  mode: env,
  optimization: { minimize: env === 'production' },
  entry: `${APP_DIR}/app.js`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      HD_DOWNLOAD_URL: JSON.stringify(config.get('downloadUrl')),
      FIREBASE_API_KEY: JSON.stringify(config.get('firebase.apiKey'))
    })
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        include: APP_DIR,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  }
}
