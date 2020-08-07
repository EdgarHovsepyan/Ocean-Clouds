var express = require('express');
const exphbs = require('express-handlebars');


var app = express()
var http = require('http').createServer(app);

app.use(express.static('build'));
app.use(express.static('textures'));
app.use(express.static('models'));
app.use(express.static('style'));



const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


app.get('/', function(req, res){
  res.render('index');
});

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}

app.use(ignoreFavicon);

http.listen(8080, function(){
  console.log('listening on *:8080');
});