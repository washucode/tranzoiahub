const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 4000;
const db = require('./queries')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.post('/usersO', db.createOrgUser)

app.post('/usersA', db.createAcaUser)

app.set("view engine","pug");
app.use(express.static( 'assets'));


app.get('/', function (req, res) {
  res.render("landing");
});

app.get('/joinsuccess', function (req, res) {
  res.render("joinsuccess");
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
