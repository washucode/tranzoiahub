const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;
// const db = require('./queries')
const nodemailer = require('nodemailer')
const { MAIL_USER,  MAIL_PASS } = require('./config');//not required for now
 


var admin = require("firebase-admin");

var serviceAccount = require("./serviceActionKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();




app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


// app.post('/usersO', db.createOrgUser)

// app.post('/usersA', db.createAcaUser)

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




app.post('/contactus', (req, res) => {

  // Instantiate the SMTP server
  const smtpTrans = nodemailer.createTransport({
    host: 'transnzoiahub.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@transnzoiahub.com',
      pass: 'pOV;F{duemQ['
    }
  })

  // Specify what the email will look like
  const mailOpts = {
    from: `${req.body.email}`, // This is ignored by Gmail
    to: 'info@transnzoiahub.com',
    subject: 'New message from contact form at transnzoiahub.com, the subject is' ,
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



const usersA= db.collection('AcademicU');
const usersO = db.collection('OrganisationU');




app.post('/usersA', (req, res) => {

  var firstname = req.body.firstname;
  usersA.add({
    firstname:req.body.firstname,
    surname:req.body.surname,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    institutionEmail:req.body.institutionEmail,
    institutionName:req.body.institutionName,
    physicalAddress:req.body.physicalAddress,
    postalAddress:req.body.postalAddress,
    Institutionsocial:req.body.Institutionsocial ,
    fieldOfStudy:req.body.fieldOfStudy,
    areaOfresearch:req.body.areaOfresearch ,
    titleOfResearchProject:req.body.titleOfResearchProject,
    objOfResearch:req.body.titleOfResearchProject
  })

  

  res.status(201).render('joinsuccess',{
          name:firstname,
        })

  const smtpTrans = nodemailer.createTransport({
    host: 'transnzoiahub.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@transnzoiahub.com',
      pass: 'pOV;F{duemQ['
    }
  })

  const mailOpts = {
    from: `${req.body.email}`, // This is ignored by Gmail
    to: 'info@transnzoiahub.com',
    subject: 'New Registration!!' ,
    text: `${req.body.firstname} (${req.body.email} : ) has just registered in catergory Academic user`
  }

  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error)
    }
    
  })
});

app.post('/usersO', (req, res) => {

  var firstname = req.body.firstname;
  usersO.add({
    firstname:req.body.firstname,
    surname:req.body.surname,
    email:req.body.email,
    phoneNumber:req.body.phoneNumber,
    gender:req.body.gender,
    rank:req.body.rank,
    role:req.body.role,
    organizationName:req.body.organizationName,
    physicalAddress:req.body.physicalAddress ,
    postalAddress:req.body.postalAddress,
    social:req.body.social ,
    typeOfBusiness:req.body.typeOfBusiness,
    noOfEmployees:req.body.noOfEmployees,
    additionalInfo:req.body.additionalInfo
  })


  

  if (res.status == 201){
    render('joinsuccess',{
        name:firstname,
      })      
  
  
  }
  // Specify what the email will look like
  
  
  res.status(201).render('joinsuccess',{
      
            name:firstname,
  })


  const smtpTrans = nodemailer.createTransport({
    host: 'transnzoiahub.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@transnzoiahub.com',
      pass: 'pOV;F{duemQ['
    }
  })

  const mailOpts = {
    from: `${req.body.email}`, // This is ignored by Gmail
    to: 'info@transnzoiahub.com',
    subject: 'New Registration!!' ,
    text: `${req.body.firstname} (${req.body.email} : ) has just registered in catergory Organisational user`
  }

  smtpTrans.sendMail(mailOpts, (error, response) => {
    if (error) {
      console.log(error)
    }
    
  })
 
  
});

var server = app.listen(port)

// var http = require('http');
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     var message = 'It works!\n',
//         version = 'NodeJS ' + process.versions.node + '\n',
//         response = [message, version].join('\n');
//     res.end(response);
// });
// server.listen();
