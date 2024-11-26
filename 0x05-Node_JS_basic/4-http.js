const http = require('http');

const PORT = 1245;
const HOST = 'localhost';

// Create the HTTP server
const app = http.createServer((_, res) => {
  const responseText = 'Hello Holberton School!';

  res.writeHead(200, {
    'Content-Type': 'text/plain',
    'Content-Length': Buffer.byteLength(responseText),
  });

  res.end(responseText);
});

// Start the server
app.listen(PORT, HOST, () => {
  console.log(`Server listening at -> http://${HOST}:${PORT}`);
});

module.exports = app;
