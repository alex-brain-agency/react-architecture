import webpack from 'webpack';
import defaults from 'defaults';
import url from 'url';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function makeWebpackConfig(opts){
  const FLAGS = {
    __DEV__: !opts.production,
    __PROD__: !!opts.production
  };

  // rough config
  var config = {
    devtool: 'eval',
    entry: [],
    output: {
      path: path.join(__dirname, '..', 'dist'),
      publicPath: opts.assetsUrl,
      filename: 'bundle.js'
    },
    externals: [],
    module: {
      loaders: []
    },
    plugins: [],
    node: {}
  };

  // mostly used for tests
  if (opts.node) {
    config.target = 'node';
    const node_modules = require('fs').readdirSync('node_modules').filter((x) => x !== '.bin');
    config.externals.push(...node_modules);
    config.output.libraryTarget = 'commonjs2';
    config.devtool = 'source-map';
  }

  const baseAssetUrl = url.format(Object.assign(url.parse(opts.assetsUrl), {pathname: ''}));

  // if it's not a single build, we're using webpack-dev-server
  if (opts.watch) {
    config.entry.push('webpack-dev-server/client?' + baseAssetUrl);
  }
  if (opts.hot) {
    config.entry.push('webpack/hot/only-dev-server');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  config.entry.push(...opts.entry);
  config.entry.push('././src/scss/core.scss');

  const dirs = {
    src: [
      path.join(__dirname, '..', 'src'),
      path.join(__dirname, '..', 'dev', 'dev-pages')
    ]
  };
  const jsLoaderConfig = {
    test: /\.js$/,
    loaders: ['babel-loader?optional[]=runtime'],
    include: dirs.src
  };

  // eval devtool is no good in production
  // also minify the code
  if (opts.production) {
    config.devtool = 'source-map';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }));
  }

  if (opts.watch) {
    var WebpackNotifierPlugin = require('webpack-notifier');
    config.plugins.push(new WebpackNotifierPlugin());
  }

  config.module.loaders.push(jsLoaderConfig);

  config.module.loaders.push({
    test: /\.less$/,

    // we can't use style-loader in node because there's no dom so it errors
    loaders: opts.node
      ? ['null-loader']
      : ['style-loader', 'css-loader', 'less-loader'],
    include: dirs.src
  });

  config.module.loaders.push({
    test: /\.scss$/,

    // we can't use style-loader in node because there's no dom so it errors
    loaders: (() => {
      if (opts.node) {
        return ['null-loader'];
      }

      var base = [
        'css?sourceMap&localIdentName=[path][name]__[local]__[hash:base64:5]',
        'sass?sourceMap&outputStyle=expanded&' +
        'includePaths[]=' + (path.resolve(__dirname, '..', './node_modules/compass-mixins/lib/'))
      ];

      // TODO: this is not working at all
      if (false) { // if(opts.production) {
        return ExtractTextPlugin.extract("style", base.join('!'));
      }
      else {
        return ['style'].concat(base);
      }
    })(),
    include: dirs.src
  });

  config.module.loaders.push({
    test: /\.rsvg$/,
    loaders: ['babel-loader', 'rsvg-loader'],
    include: dirs.src
  });

  config.module.loaders.push(
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.mp3(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    { test: /\.jpe?g$|\.gif$|\.png$$/, loader: 'file-loader?name=images/[name].[ext]' }
  );


  if (!opts.node) {
    config.node.net = 'empty';
    config.node.dns = 'empty';
    config.node.tls = 'empty';
  }

  return config;
}
