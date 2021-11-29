// TODO: Create a form to get details from the user
  // TODO: Perform basic validation on th client side
  // TODO: Perform a user validation with Google recaptcha v3 on the server side
  // TODO: Get a feedback if the details have been sent correctly

import './form.css'
import axios from "axios";
import React, {useState, useCallback} from "react";
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export const Form = (props) => {
  //* Define state for Google recaptcha tokem 
  const [ token, setToken ] = useState()

  //* Define state for message feedback in the button 
  const [ status, setStatus ] = useState()

  //* Define state for feedback collapse
  const [ open, setOpen ] = useState(false)

  //* Define state for button status  
  const [ loading, setLoading ] = useState(false)

  //* Define state for subscribe status
  const [ subscribe, setSubscribe ] = useState(false)

  //* Define state for user details with an object 
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    message: '',
  })

  //* Create an instance of axios to perform request on the backend, 
  //* passing the port number from the props. 
  const backServer = axios.create({baseURL: `http://127.0.0.1:${props.ports.back}`})

  //* Use a useCallback hook to set the token for the recaptcha verification 
  const recaptchaVerification = useCallback((token) => {
      setToken(token)
    }, [])
 
  //* Define a custom hook to update the formData state
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  //* Define a custom hook to handle the form submit 
  const handleSubmit = async (e) => {
    //* Prevent the default form behaviour 
    e.preventDefault();

    //*Change the status of the button to give a f
    setStatus('Submitting...')
    setLoading(true)

    //* Imitate a sleep for a better UX 
    await new Promise(resolve => setTimeout(resolve, 2000));

    //* Store the token in an obj and pass it to the POST request to verify it on the back-end
    const reCaptchaData = {'token':token}
    const response = await  backServer.post('/api/captchaVerification', reCaptchaData)

    //* Parse the data from the response 
    const responseData = await response.data

    if (responseData.success) {
      //* In case the captcha verification is successful perform a POST req to save the user details
      const data = {
        ...formData,
        "subscribe": subscribe
      }
  
      backServer.post('/contact-us', data)
        .then(async result => {
          const button = document.querySelector('#sendButton')
          
          if (result.status === 200) {
            button.disabled = false
            setStatus('Message sent!')
          };
          
          await new Promise(resolve => setTimeout(resolve, 2000));

          setLoading(false)
        })
        .catch((err) => console.log(err))    
    } else {
      //* In case the verification is unsuccessfull reload the component 
      setOpen(true)

      await new Promise(resolve => setTimeout(resolve, 2000));

      window.location.href = `http://127.0.0.1:${props.ports.front}`
    }
  }

  return(
    <div className="container">
      <h2>Contact us</h2>
      <hr />
      <form onSubmit={handleSubmit}>
        <FormControl className="margin-form" id="contact-form">
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input      label="Name"
                      id="name"
                      color="warning"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required/>
        </FormControl>
        <FormControl className="margin-form">
          <InputLabel htmlFor="email">Email-address</InputLabel>
          <Input  label="Email-address"
                      id="email"
                      color="warning"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required/>
        </FormControl>
        <FormControl className="margin-form">
          <TextField  label="Message"
                      placeholder="Write your message here..."
                      id="message"
                      color="warning"
                      name="message"
                      multiline
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required/>
        </FormControl>
          <div id="subscribe" className="margin-form">
            <label htmlFor="subscribe">Want subscribe to our newsletter?</label>
            <Checkbox name="subscribe"
                      checked={subscribe}
                      color="warning"
                      onChange={(e) => {setSubscribe(!subscribe)}}
                      />
          </div>            
          <Button variant="contained"
                  className="button"
                  id="sendButton" 
                  disabled={loading}
                  color="warning"
                  type="submit"
                  >
            {loading ? status : "Submit"}
          </ Button>
          <GoogleReCaptcha onVerify={recaptchaVerification}/>
          <Collapse in={open}>
            <Alert severity="warning" color="warning" disabled>
              Something wrong happened!
            </Alert>
          </Collapse>
      </form>
    </div>
  )
}