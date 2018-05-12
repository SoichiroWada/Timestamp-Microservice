var bodyParser = require('body-parser');
let ejs = require('ejs');
var fs = require('fs');
var urlencodedParser = bodyParser.urlencoded({extended: false});


module.exports = function(app){

  var unixTime, naturalDate, createdDate, unixTime2, naturalDate2, unixDiff, naturalDate3;

  var obj = { unix: unixTime, natural: naturalDate, created: createdDate,
              unix2: unixTime2, natural2: naturalDate2, created2: createdDate,
              unix3: unixDiff, natural3: naturalDate3, created3: createdDate };
    //GET call to return JSON that formats matural and unix date
    app.get('/', function(req, res){
      res.render('home', { index: obj } );
      //res.render('home');
    });

    app.post('/', urlencodedParser, function(req, res){
      console.log('req.body:'), console.log(req.body);
      console.log('req.params:'), console.log(req.params);
      var dateVal = req.body.item;
      createdDate = req.body.created;

    var dateFormattingOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour:'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    };

    if (isNaN(dateVal)) {
      naturalDate = new Date(dateVal);
      naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
      var unixTime = new Date(dateVal).getTime()/1000;
    }
    else {
      unixTime = dateVal;
      naturalDate = new Date(dateVal * 1000);
      naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    }

    var newCreated = new Date().getTime();
    console.log("newCreated:"),console.log(newCreated);
    unixTime2 = Math.floor(newCreated/1000);
    console.log("unixTime2:"),console.log(unixTime2);
    naturalDate2 = new Date(newCreated);
    naturalDate2 = naturalDate2.toLocaleDateString("en-us", dateFormattingOptions);
    console.log("naturalDate2:"), console.log(naturalDate2);

    if (unixTime > unixTime2) {
      unixDiff = Number(unixTime - unixTime2);
    }
    else {
      unixDiff = Number(unixTime2 - unixTime);
    }
    console.log("unixDiff:"),console.log(unixDiff);

    var year = 60*60*24*365;
    var day = 60*60*24;
    var hour = 60*60;
    var minute = 60;

    var newYear = Math.floor(unixDiff / year);
    var remainingDiff = unixDiff - year * newYear;

    var newDay = Math.floor(remainingDiff / day);
    remainingDiff = remainingDiff - newDay * day;

    var newHour = Math.floor(remainingDiff / hour);
    remainingDiff = remainingDiff - newHour * hour;

    var newMinute = Math.floor(remainingDiff / minute);
    var newSecond = remainingDiff - newMinute * minute;

    naturalDate3 = newYear.toString()+"years"+" "+newDay.toString()+"days"+" "+newHour.toString()+"hours"+" "+newMinute.toString()+"minutes"+" "+newSecond.toString()+"seconds";
    console.log("naturalDate3:"),console.log(naturalDate3);

    obj = { unix: unixTime, natural: naturalDate, created: createdDate,
      unix2: unixTime2, natural2: naturalDate2, created2: createdDate,
      unix3: unixDiff, natural3: naturalDate3, created3: createdDate };
    console.log(obj);

    res.json(obj);

  });

};
