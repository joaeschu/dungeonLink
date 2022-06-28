const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

var httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({});
io.on('connection', (socket) => {
  socket.on('message', msg => {
    io.emit('message', msg);
  });
  socket.on('message2', msg => {
    io.emit('message2', msg);
  });
});

app.all('/*',function(req, res) {
  proxy.web(req, res, { target: 'http://127.0.0.1:8000' });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});
