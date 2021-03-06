const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const Dotenv = require('dotenv-webpack');
const env = process.env.NODE_ENV;

console.log(process.env);

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');




module.exports = {
  module: {
    rules: [{
      include: [path.resolve(__dirname, 'src')],
      loader: 'babel-loader',

      options: {
        plugins: ['syntax-dynamic-import', '@babel/plugin-proposal-class-properties'],

        presets: [['@babel/preset-env',{
          'modules': false
        }], '@babel/preset-react',]
      },

      test: /\.jsx?$/
    }, {
      test: /\.css$/,

      use: [{
        loader: 'style-loader',

        options: {
          sourceMap: true
        }
      }, {
        loader: 'css-loader'
      }]
    }]
  },
  plugins: [
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns:'dist'}),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      cache:false,
      inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin(),
    new Dotenv({
      path: `./.env-${env === "production" ? "prod" : "dev"}`,
    })
 ],
 entry:() => './src',

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },

  mode: 'development',

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          priority: -10,
          test: /[\\/]node_modules[\\/]/
        }
      },

      chunks: 'async',
      minChunks: 1,
      minSize: 30000,
      name: true
    }
  }
}