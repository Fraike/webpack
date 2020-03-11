const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer((req, res) => {
  let parsedURL = url.parse(req.url)
  console.log(req.method.toLowerCase(), parsedURL.path)
  // && parsedURL.path.split('?')[0] === '/live/one/list'
  if (req.method.toLowerCase() === 'get') {
    let datas = fs.readFileSync('./server/data1.json')
    setTimeout(function () {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(datas)
    }, 100)
  }
  else {
    res.statusCode = 404
    res.statusMessage = 'NOT FOUND'
    res.end('NOT FOUND')
  }
})

server.listen(8099)