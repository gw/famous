var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var express = require('express');

mongoose.connect('mongodb://172.17.0.3/Texts'); //TODO: Read this from /etc/hosts
var textSchema = new Schema ({
  text: String
})
var Text = mongoose.model('Text', textSchema);

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());

var envPort = process.env.PORT;
console.log('env PORT: ', envPort);

app.set('port', (envPort || 5000));

app.post('/', function(req, res) {
  var input = req.body;
  if (input.text === undefined || input.text === null) {
    res.status(400).send('Please include a "text" field');
  } else {
    new Text({text: input.text})
      .save(function(err, savedText) {
        if (err) { 
          console.log('ERROR', err); 
          res.status(500).send('We could not save your text');
        } else {
          res.status(200).send(savedText);
        }
      });
  }
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port')) //Default port = 5000
});
