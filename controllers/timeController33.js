var bodyParser = require('body-parser');
let ejs = require('ejs');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

  var dateVal, naturalDate, createdDate;
  var obj = { unix: dateVal, natural: naturalDate, created: createdDate };

    //GET call to return JSON that formats matural and unix date
    app.get('/', function(req, res){
      //var obj = { unix: dateVal, natural: naturalDate };
      res.render('home', { index: obj } );
      //res.render('home');
    });

    app.post('/', urlencodedParser, function(req, res){
      console.log('req.body:'), console.log(req.body);
      console.log('req.params:'), console.log(req.params);
      dateVal = req.body.item;
      createdDate = req.body.created;

    var dateFormattingOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    if (isNaN(dateVal)) {
      naturalDate = new Date(dateVal);
      naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
      var unixDate = new Date(dateVal).getTime()/1000;
    }
    else {
      var unixDate = dateVal;
      naturalDate = new Date(dateVal * 1000);
      naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    }
    obj = { unix: dateVal, natural: naturalDate, created: createdDate };
    console.log(obj);
    var newCreated = new Date(createdDate);
    var checker = newCreated.getTime()/1000;
    console.log(checker);

    res.json(obj);
    //res.render('home', { index: delta } );
  });
  //GET call to return JSON that formats matural and unix date
};
