<<<<<<< HEAD
module.exports = { entry: './js/app.js', output: { path: __dirname, filename: './js/out.js' } };
1
=======
module.exports = {
  entry: './js/app.js',
  output: {
    filename: "./js/out.js"
  },
  devServer: {
    inline: true,
    contentBase: './',
    port: 3001
  },
  watch: true,
  module: {
    rules: [{
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: "./bin/"
            }
          }
        ]
      }
    ]
  }
}
>>>>>>> 102c1d19698db1ca5a2175563b77e4aa3773dcbb
