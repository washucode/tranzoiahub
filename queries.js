const Pool = require('pg').Pool
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'transzoiadb',
  password: 'password',
  port: 5432,
})


const createOrgUser = (request, response) => {
    const { firstname,surname, email,phoneNumber,gender,rank,role,organizationName,physicalAddress ,postalAddress ,social ,typeOfBusiness ,noOfEmployees ,additionalInfo } = request.body
  
    pool.query('INSERT INTO joinedOrgUsers (firstname,surname ,email ,phoneNumber ,gender ,rank ,role ,organizationName ,physicalAddress ,postalAddress ,social ,typeOfBusiness ,noOfEmployees ,additionalInfo) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)',
     [firstname,surname, email,phoneNumber,gender,rank,role,organizationName,physicalAddress ,postalAddress ,social ,typeOfBusiness ,noOfEmployees ,additionalInfo], (error, results) => {
      if (error) {
        throw error
      }
      
      response.status(201).render('joinsuccess',{
        name:firstname,
      })
    })
  }


  const createAcaUser = (request, response) => {
    const { firstname,surname,email,phoneNumber,institutionEmail,institutionName,physicalAddress ,postalAddress ,Institutionsocial ,fieldOfStudy ,areaOfresearch ,titleOfResearchProject,objOfResearch } = request.body
  
    pool.query('INSERT INTO joinedAcaUsers (firstname,surname,email,phoneNumber,institutionEmail,institutionName,physicalAddress ,postalAddress ,Institutionsocial ,fieldOfStudy ,areaOfresearch ,titleOfResearchProject,objOfResearch) VALUES ($1, $2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)',
     [firstname,surname,email,phoneNumber,institutionEmail,institutionName,physicalAddress ,postalAddress ,Institutionsocial ,fieldOfStudy ,areaOfresearch ,titleOfResearchProject,objOfResearch], (error, results) => {
      if (error) {
        throw error
      }
      
      response.status(201).render('joinsuccess',{
        name:firstname,
      })
    })
  }

  


  module.exports = {
    
    createOrgUser,
    createAcaUser,
    
  }