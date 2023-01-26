require('dotenv').config();
const app = require('./app');
const http = require('http');

const PORT = process.env.PORT || 3002;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
