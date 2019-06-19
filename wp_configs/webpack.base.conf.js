const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const fs = require('fs')


const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../docs'),
  assets: 'assets'
}

const htmlPlugins = generateHtmlPlugins('html/views');


module.exports = {
  node: {
    fs: "empty"
 },
  externals: {
    paths: PATHS
  },
  entry: {
    bundle: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}/js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      }, {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
        options: {
          name: `${PATHS.assets}/fonts/[name].[ext]`
        }
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            },
          }, {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: `${PATHS.src}/js/postcss.config.js`
              }
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              includePaths: ["node_modules/chroma-sass/sass", "node_modules/typey/stylesheets"]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/[name].css`,
    }),
    new CopyWebpackPlugin([{
        from: `${PATHS.src}/img`,
        to: `${PATHS.assets}/img`
      },
      {
        from: `${PATHS.src}/static`,
        to: ''
      },
    ]),
    new webpack.HotModuleReplacementPlugin(),

  ].concat(htmlPlugins).concat([
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    })
  ]),
}


function generateHtmlPlugins(templateDir) {
  const templateFiles = fs.readdirSync(path.resolve(PATHS.src, templateDir));
  return templateFiles.map(item => {
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      hash: false,
      filename: `${name}.html`,
      template: path.resolve(PATHS.src, `${templateDir}/${name}.${extension}`),
      inject: true,
    })
  })
}