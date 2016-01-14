var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});
var proxyTarget = process.env.PROXY_TARGET || '';

module.exports = function(req, res){
  var body = '';
  req.on('data', function(data) {
      body += data;
  });

  req.on('end', function() {
      var superagent = require('superagent');

      if(req.method === "DELETE") req.method = "DEL";

      var superReq = superagent[req.method.toLowerCase()](proxyTarget + req.url);

      if (req.headers.authorization) {
          superReq.set('authorization', req.headers.authorization);
      }

      var refererPath = req.headers.referer
          ? require('url').parse(req.headers.referer).path
          : '/';

      console.log(req.method + ' ' + proxyTarget + req.url);
      if (req.method.toLowerCase() !== 'get') {
        superReq.set('content-type', 'application/json')
      }
      superReq
          .redirects(0)
          .set('origin', proxyTarget)
          .set('referer', proxyTarget + refererPath)
          .send(body)
          .end(function(err, proxyRes) {
            if (!proxyRes) {
              res.writeHead(503);
              res.end('proxy-server received a response object `' + proxyRes + '`');
              return;
            }
            var headers = proxyRes.headers;
            console.log('%d %s %s', proxyRes.status, req.method, proxyTarget + req.url);
            console.log(Object.keys(headers).map(function(header) {
                return header + ': ' + headers[header];
            }).join('\n'));
            console.log('');
            console.log(proxyRes.text);
            console.log('');

            delete headers['transfer-encoding'];
            delete headers['connection'];
            delete headers['content-encoding'];
            headers['content-length'] = new Buffer(proxyRes.text || '').length;
            res.writeHead(proxyRes.status, headers);
            res.end(proxyRes.text);
          });
  });
}
