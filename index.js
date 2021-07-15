const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 4000;
const db = require('./queries')
const nodemailer = require('nodemailer')
 const { MAIL_USER,  MAIL_PASS } = require('./config');
 

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



app.post('/contactus', (req, res) => {

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'tranzoiahub.com',
    port: 465,
    secure: true,
    auth: {
      user: MAIL_USER,
      pass: MAIL_PASS
    }
  })

  // Specify what the email will look like
  const mailOpts = {
    from: `${req.body.email}`, // This is ignored by Gmail
    to: MAIL_USER,
    subject: 'New message from contact form at tranzoiahub.com, the subject is' ,
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  }

  // Attempt to send the email
  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error)
      res.render('contactfail') // Show a page indicating failure
    }
    else {
      res.render('contactsuccess') // Show a page indicating success
    }
  })
})


