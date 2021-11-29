// TODO: Define a MongoDB Schema to use as model for the entry data

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  subscribe: { type: Boolean, required: true }
}, {timestamps: true})

export const Contact = mongoose.model('Contact', contactSchema)