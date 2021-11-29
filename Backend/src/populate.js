import fs from 'fs';
import mongoose from 'mongoose';
import { Contact } from '../models/contact.js'

const jsonData = JSON.parse(fs.readFileSync('./MOCK_DATA.json', 'utf8'));

console.log('Connecting to MongoDB')

mongoose.connect('mongodb://localhost:27017/tastyTreats')
  .then(async result => {
    
    console.log('Connected to MongoDB')
    
    await jsonData.forEach(contactObj => {
      const contact = new Contact(contactObj)
      
      contact.save()
      .then(res => res)
      .catch(err => console.log(err))
    })

    await new Promise(resolve => setTimeout(resolve, 5000));
    console.log('Database populated!')
    process.exit()
  })
  .catch(err => console.log(err))

