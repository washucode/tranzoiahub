const express = require('express');
const app = express();
const port = 3000;


app.set("view engine","pug");


app.get('/', function (req, res) {
  res.render("landing");
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
