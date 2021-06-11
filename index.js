const express = require('express');
const app = express();
const port = 3000;


app.set("view engine","pug");
app.use(express.static( 'assets'));


app.get('/', function (req, res) {
  res.render("landing");
});

app.get('/about', function (req, res) {
    res.render("about");
  });

  app.get('/programs', function (req, res) {
    res.render("programs");
  });
  app.get('/joinus', function (req, res) {
    res.render("joinus");
  });

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
