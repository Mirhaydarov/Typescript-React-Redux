/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, { mode }) => {
  const devMode = mode === 'development';

  const setPlugins = () => {
    return [
      devMode
        ? new HtmlWebpackPlugin({
          template: './public/index.html',
        })
        : new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
      }),
    ];
  };

  return {
    entry: './src/index.tsx',
    output: {
      filename: devMode ? '[name].[hash].js' : 'bundle.js',
      path: path.resolve(__dirname, './build'),
    },

    devServer: {
      contentBase: path.resolve(__dirname, './build'),
      compress: true,
      port: 9000,
    },

    plugins: setPlugins(),

    devtool: devMode ? 'inline-source-map' : false,

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            {
              loader: 'dts-css-modules-loader',
              options: {
                namedExport: true,
              }
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  exportLocalsConvention: 'camelCaseOnly',
                  localIdentName: '[local]__[hash:base64:5]'
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|webp|gif|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'images',
                name: '[name].[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|otf|eof)$/,
          use: [
            {
              options: {
                outputPath: 'fonts',
                name: '[name].[ext]',
              },
              loader: 'file-loader',
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  };
};
