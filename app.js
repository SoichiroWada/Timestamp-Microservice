//basic required imports for NodeJS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());
//GET call to return JSON that formats matural and unix date

app.get('/', function(req, res, next){
  console.log('Hello this is root page!');
  res.send('Hello this is root page!');
  next();
})

app.get('/dateValues/:dateVal', function(req, res, next){
  var dateVal = req.params.dateVal;
  console.log(dateVal);
  var dateFormattingOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if (isNaN(dateVal)) {
    var naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    var unixDate = new Date(dateVal).getTime()/1000;
  }
  else {
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
  }

  res.json({unix: dateVal, natural: naturalDate});
  next();
})

app.listen(3000, function(){
  console.log('listening to the port 3000')
})
