const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ENTRY_FILE = path.resolve(__dirname, 'src/main.js');
const DEV_OUTPUT_PATH = path.resolve(__dirname, 'dev', 'admin');
const PROD_OUTPUT_PATH = path.join(__dirname, './', 'dist', 'wwwroot');
const baseConfig = {
  entry: {
    vendors: [
      //path.resolve(__dirname, 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'),
      path.resolve(__dirname, 'src/app/styles/vendors.scss'),
    ],
    main: [ENTRY_FILE],
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   loader: 'ts-loader',
      //   exclude: /node_modules/,
      //   options: {
      //     configFile: 'tsconfig.json',
      //   },
      // },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: [
      //'.tsx', '.ts',
      '.js',
      '.jsx',
    ],
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@shared': path.resolve(__dirname, 'src/shared'),
    },
  },
  target: 'web',
  optimization: {
    splitChunks: {
      minSize: 30, // chunk 的最小大小
      cacheGroups: {
        default: {
          name: 'common-chunk',
          chunks: 'initial',
          minChunks: 2, // 模組被引用2次以上才抽出
          priority: -20,
        },
        vendors: {
          // 分離第三方套件
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor-chunk',
          chunks: 'initial',
          priority: -10,
        },
        // 分離指定文件範例:
        // locallib: {
        //     test: /(src\/locallib\.js)$/,
        //     name: 'locallib',
        //     chunks: 'initial',
        //     priority: -9
        // }
      },
    },
  },
};

// Production config
const prodConfig = {
  mode: 'production',
  output: {
    path: PROD_OUTPUT_PATH,
    filename: 'static/[name].[contenthash].js',
    assetModuleFilename: 'static/[hash][ext][query]',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new WebpackManifestPlugin(),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      filename: 'index.html',
    }),
  ],
};

// Development config
const devConfig = {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: DEV_OUTPUT_PATH,
    filename: 'static/[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name].bundle.css',
      chunkFilename: '[id].css',
    }),
    new WebpackManifestPlugin(),
    new HtmlWebpackPlugin({
      template: './src/app/index.html',
      filename: 'index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/assets'),
    },
    compress: true,
    port: 9002,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': `http://localhost:44353`,
      '/files': `http://localhost:44353`,
    },
  },
};

module.exports = () =>
  process.env.NODE_ENV === 'development' ? { ...baseConfig, ...devConfig } : { ...baseConfig, ...prodConfig };
