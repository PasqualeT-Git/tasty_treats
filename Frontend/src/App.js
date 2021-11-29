// TODO: Create React routes
  // TODO: Create a contact-us route that lead to the form
  // TODO: Redirect to the contact-us path from the root path /
  // TODO: Create a contacts route that leads to a contacts admin panel
  // TODO: Create a 404 route from the all not existing paths

import './App.css';
import dotenv from 'dotenv';
import { Navbar } from './components/Navbar'
import { Form } from './components/Form';
import { Contacts } from './components/Contacts';
import { NotFound } from './components/NotFound';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//* Access to the enviroment variables
dotenv.config()

//* Store the back-end and front-end ports from the enviroment variables
//* to pass them to form and contacts components as props
const ports = {
    'back':process.env.REACT_APP_PORT_BACK,
    'front': process.env.REACT_APP_PORT_FRONT
  }

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/contact-us" />} />
        <Route exact path="/contact-us" element={<Form ports={ports} />} />
        <Route exact path="/contacts" element={<Contacts ports={ports} />} />
        <Route path="/404" element={<NotFound/>} />
        <Route path="*" element={<Navigate replace to="/404" />} />
      </Routes>
    </Router>
  );
}

export default App;
