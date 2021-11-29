// TODO: Set the back server using express
// TODO: Grant access from the front-end woith CORS policy
// TODO: Access to MongoDB database
// TODO: Define routes for CRUD operations

import cors from 'cors'
import axios from 'axios'
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import { Contact } from '../models/contact.js';

//* =================== Express ===================// 

  //* Initialize an express server
  const server = express();

  //* Call the express json method to get JSON obj in the POST call
  server.use(express.json())

//* ==================== Configs ================//

  //* Call the env config method to access env variables
  dotenv.config()

  //* Set port constants from the env PORT value
  const port = process.env.PORT || 3000
  const port_front = process.env.PORT_FRONT || 3001

  //* Use cors module to grant acces-origin to localhost [local-test purpose] 
  server.use(cors({
    origin: [`http://127.0.0.1:${port_front}`, `http://localhost:${port_front}`]
  }))


//* ==================== MongoDB ======================//

  //* Use mongoose to connect MongoDB database
  //* Run the express server when MongoDB database is connected
  mongoose.connect('mongodb://localhost:27017/tastyTreats')
    .then((result) => {
      console.log(`Server is running on port ${port}`)
      server.listen(port)
    })
    .catch((err) => console.log(err));

//*==================== Routes - GET ===================// 

  //* Act on form endpoint 
  server.get('/contact-us', (req, res) => {
  });

  //* Act on Contacts endpoint
  server.get('/contacts', (req, res) => {
    

    Contact.find()
      .then((result) => res.send(result))
      .catch((err) => console.log(err))
  });
    
  //* Act on root page
  server.get('/', (req, res) => {
    res.send('Hello from back!!')
  });

//*==================== Routes - POST ===================//

  //* Save in MongDB data with POST request 
  server.post("/contact-us", (req, res) => {
    const data = req.body 
    const contact = new Contact(data)

    contact.save()
      .then((result) => res.send(result))
      .catch((err) => console.log(err))
  });

  //* Fetch request to check the google captcha
  server.post('/api/captchaVerification', (req, res) => {
    const token = req.body.token

    const payload = `response=${token}&secret=${process.env.CAPTCHA_SECRET_KEY}`

    axios.post('https://www.google.com/recaptcha/api/siteverify', payload)
      .then(response => res.send(response.data))
      .catch(err => console.log(err))
  })

  //* Check if the user credentials match to grant the access to contacts
  server.post('/login', (req, res) => {
    const user = req.body
    
    if (user.username === process.env.ADMIN_USERNAME && 
        user.password === process.env.ADMIN_PASSWORD) {
          res.send({success:true})
        } else {
          res.send({success:false})
        }
  })

//* ================= Routes - DELETE ====================//

  //* Define a DELETE route to delete a contact passing its ID
  server.delete("/contacts/:id", (req, res) => {
    const id = req.params.id

    Contact.deleteOne({_id: new Object(id)})
      .then(result => res.send(result))
      .catch(err => console.log(err))
  }); 
