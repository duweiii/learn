const http = require("http")
const fs = require('fs')
const host = '192.168.2.6';
const port = 8899;

const app = http.createServer((req, resp) => {
  console.log('A Request Is Comming')
  const content = fs.readFileSync('./index.html', 'utf-8')
  resp.statusCode = 200;
  resp.setHeader('Content-Type','text/html;charset=utf-8')
  resp.end(content)
})

app.listen(port, host, () => {
  console.log( `server is running at ${host}:${port}` )
})