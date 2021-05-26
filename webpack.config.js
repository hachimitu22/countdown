module.exports = {
  mode: 'development',
  target: 'node',
  entry: './src/frontend/index.ts',
  output: {
    path: `${__dirname}/public`,
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