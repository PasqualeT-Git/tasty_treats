// TODO: Implement the GoogleReCaptchaProvider component to perform the recaptcha verification 

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import dotenv from 'dotenv';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

dotenv.config()

const sitekey = process.env.REACT_APP_SITE_KEY

ReactDOM.render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={sitekey}>
      <App />
    </GoogleReCaptchaProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
