module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: `${__dirname}/bin`,
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /.ts$/,
        use: 'ts-loader',
        // include: `${__dirname}/src`,
        // exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.ts', '.js'
    ]
  }
}