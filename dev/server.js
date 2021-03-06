import yargs from 'yargs';
const {argv} = yargs
  .help('h').alias('h', 'help')
  .describe('asset-url', 'where assets are to be served from')
  .describe('main-url', 'the main web server root')
  .describe('port', 'port for production')
  .boolean('prod').describe('prod', 'do a production build')
  .boolean('dev').describe('dev', 'do a development build (default)')
  .boolean('only-dev-server').describe('only-dev-server', 'only serve assets')
  .boolean('only-main-server').describe('only-main-server', 'don\'t run dev-server')
  .boolean('dev-pages').describe('dev-pages', 'instead of running the main app, run the individual component pages');


import url from 'url';
import path from 'path';
import fs from 'fs';
import express from 'express';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import getConfig from './getConfig';
import makeWebpackConfig from './makeWebpackConfig';

var appConfig = getConfig({
  hot: true,
  assetUrl: argv.assetUrl,
  mainUrl: argv.mainUrl,
  production: !argv.dev && argv.prod,
  onlyMainServer: argv.onlyMainServer,
  devPages: argv.devPages,
  watch: true,
  port: argv.port
});

var config = makeWebpackConfig(appConfig);

// run the servers defined below
if (!argv.onlyMainServer) {
  runWebpackDevServer();
}
if (!argv.onlyDevServer) {
  runMainServer();
}

function runWebpackDevServer(){
  const urlParts = url.parse(config.output.publicPath);
  const devServer = new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
  });

  const host = ['localhost', '127.0.0.1'].indexOf(urlParts.hostname) === -1
    ? '0.0.0.0'
    : '127.0.0.1';

  console.log(`Starting webpack-dev-server at ${urlParts.hostname}:${urlParts.port}`);
  devServer.listen(urlParts.port || '8080', host, (err) => {
    if (err) {
      console.error('FATAL: Error starting webpack-dev-sever');
      console.error(err);
      process.exit(1);
    }
    else {
      console.log(`Started webpack-dev-server at ${urlParts.hostname}:${urlParts.port}`);
    }
  });
}

function runMainServer(){
  const app = express();
  const apiRouter = express.Router();
  const urlParts = url.parse(appConfig.mainUrl);

  // For production: also serve webpack built files
  app.use('/public', express.static('./dist'));
  app.use('/assets', express.static('./assets'));

  app.use('/api', apiRouter);

  console.log(appConfig);

  app.get('*', (req, res) => {
    fs.readFile(path.join(__dirname, 'index.html'), 'utf8', (err, content) => {
      if (err) {
        console.error('FATAL: error reading dev/index.html');
        console.error(err);
        process.exit(1);
      }

      var publicPath =  config.output.publicPath;
      if(appConfig.production) {
        publicPath = appConfig.assetsUrl;
      }

      var html = content.replace(/%ASSET_URL%/g, publicPath);
      res.send(html);
    });
  });

  console.log(`Starting main-server at http://${urlParts.hostname}:${urlParts.port}`);
  var http = require('http');
  http.createServer((req, res) => {
    if (req.url.indexOf('/api/') === 0) {
      console.error('PROXY', req.url);
      require('./proxy-server')(req, res);
    }
    else {
      app(req, res);
    }
  })
  .listen(urlParts.port, (err) => {
    if (err) {
      console.error('FATAL: Error starting main-server');
      console.error(err);
      process.exit(1);
    }
    else {
      console.log(`Started main-server at http://${urlParts.hostname}:${urlParts.port}`);
    }
  });
}
