var express = require('express');
var timeController = require('./controllers/timeController');
var app = express();

//set up template engine
app.set('view engine', 'ejs');
//static files
app.use(express.static('./public'));

timeController(app);

app.listen( process.env.PORT || 4000, function(){
  console.log('You are listening to the port 4000')
})
