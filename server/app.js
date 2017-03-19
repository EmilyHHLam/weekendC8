var express = require ('express');

var app = express();
var port = 4000;

app.use (express.static('server/public', {
  index: 'views/index.html'
}));

app.get("/result", function(req, res){
  res.send(result);
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.post("/operation", function(req, res){
  var result;
  var first = parseInt(req.body.firstNumber);
  var second = parseInt(req.body.secondNumber);
  if (req.body.method === 'Add') {
    result = first + second;
  } else if (req.body.method === 'Minus') {
    result = first - second;
  }else if (req.body.method === 'Time') {
    result = first*second;
  }else if (req.body.method === 'Divide') {
    result = first/second;
  }

  console.log( result);
  //res.send(result);

  res.sendStatus(200);
});

app.listen(port);
console.log("listening port", port);
