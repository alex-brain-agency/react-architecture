import defaults from 'defaults';

export default function getConfig(opts){
  var mainPort = '8080';

  if(opts.port) {
    mainPort = opts.port;
  }

  var defaultOpts = {
    production: false,
    assetsUrl: 'http://localhost:8081/public',
    mainUrl: 'http://localhost:' + mainPort,
    hot: false,
    watch: true,
    entry: opts.devPages ? ['./dev/dev-pages/index'] : ['././src/client'],

    test: false,
    devServer: true,
    node: false
  };

  if (opts.devPages) {
    defaultOpts.assetsUrl = 'http://localhost:9081/public';
    defaultOpts.mainUrl = 'http://localhost:9080';
  }

  if(opts.production) {
    defaultOpts.assetsUrl = '/public/';
    defaultOpts.mainUrl = `http://localhost:${mainPort}/`;
  }

  var config = defaults(opts, defaultOpts);
  return config;
}
