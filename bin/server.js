const http = require('http');
const fs = require('fs');
const path = require('path');

// HTTPサーバーのイベントハンドラを定義
http.createServer(function (req, res) {
  console.log(req.url);

  const root = 'public';
  const url = req.url === '/' ? 'index.html' : req.url;
  const extension = path.extname(url).toLocaleLowerCase();
  const contentType = ({
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.wav': 'audio/wav',
  })[extension] || 'application/octet-stream';

  fs.readFile(path.join(root, url), (err, data) => {
    if (!err) {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(data);
    } else {
      console.log(err);
    }
  });

}).listen(3000, '127.0.0.1'); // 127.0.0.1の1337番ポートで待機
