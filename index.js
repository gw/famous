var morgan = require('morgan');
var mongoose = require('mongoose');
var express = require('express');

var app = express();
app.use(morgan('dev'));

var envPort = process.env.PORT;
console.log('env PORT: ', envPort);

app.set('port', (envPort || 5000))

app.get('/', function(request, response) {
  response.send('Yo World!')
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
