(async function() {
  'use strict';
  
  // environment variables
  const PORT          = 8888
  
  // npm packages
  const express       = require('express')
  const app           = express()
  const server        = require('http').createServer(app)
  const io            = require('socket.io')(server)
  const { expressCspHeader, INLINE, SELF } = require('express-csp-header')
  
  io.attach(server)

  app.use(expressCspHeader({
    directives: {
      'default-src': [SELF],
      'script-src': [SELF, INLINE, 'https://cdnjs.cloudflare.com'],
      'connect-src': [SELF],
    }
  }))

  // serve static files in the 'public' directory
  app.use('/', express.static(__dirname + '/public'))
  
  // socket.io functions
  io.on('connection', function (socket) {
    console.log("Somebody connected via socket.io")
  })
  
  // start listening
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT} (HTTP + SOCKET.IO) ...`)
  }) 
  
})()
  