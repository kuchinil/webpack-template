const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpckPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

console.log('DEVELOPMENT:', isDev);

const plugins = () => {
  const base = [
    new HTMLWebpackPlugin({
      template: 'pug/pages/index.pug',
    }),
    new CleanWebpackPlugin(),
    new CopyWebpckPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicons/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: filename('css')
    })
  ]

  if(isProd) {
    base.push(new BundleAnalyzerPlugin())
  }

  return base
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: "development",
  entry: {
    main: ['@babel/polyfill','./index.jsx'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    compress: true,
    port: 9000,
  },
  devtool: isProd ? 'eval' : 'source-map',
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.(pug|jade)$/i,
        use: [
          'pug-loader'
        ]
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader,'css-loader'],
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        type: 'asset/resource'
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        use: ['csv-loader']
      },
      {
        test: /\.js$/,
        exclude: '/node_modules',
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      },
      {
        test: /\.ts$/,
        exclude: '/node_modules',
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',
          ]
        }
      },
      {
        test: /\.jsx$/,
        exclude: '/node_modules',
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      }
    ]
  },
  target: 'web'
}