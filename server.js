var express = require('express');
var app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + process.env.PORT);
});
