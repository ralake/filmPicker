const webpack = require('webpack')
const config = require('config')

const APP_DIR = `${__dirname}/app/client`
const BUILD_DIR = `${__dirname}/public`

module.exports = {
  entry: `${APP_DIR}/app.js`,
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      SD_DOWNLOAD_URL: JSON.stringify(config.get('downloadUrls.sd')),
      HD_DOWNLOAD_URL: JSON.stringify(config.get('downloadUrls.hd')),
      FIREBASE_API_KEY: JSON.stringify(config.get('firebase.apiKey')),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(config.get('firebase.authDomain')),
      FIREBASE_DATABASE_URL: JSON.stringify(config.get('firebase.databaseURL')),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(config.get('firebase.storageBucket'))
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
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      }
    ]
  }
}
