const APP_DIR = `${__dirname}/src/client`
const BUILD_DIR = `${__dirname}/public`

module.exports = {
  // the location of the main file to be transpiled
  entry: `${APP_DIR}/app.js`,
  // the location and name of the file that will built by webpack containing all of the bundled
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    // loaders allow you to customise the bundling process somewhat
    loaders: [
      // tell webpack to use babel to transpile ES6 files to ES5
      {
        test: /\.js/,
        include: APP_DIR,
        loader: 'babel-loader'
      },
      // tells webpack to inject the CSS into the page in a script tag
      {
        test: /\.css$/,
        include: APP_DIR,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}
