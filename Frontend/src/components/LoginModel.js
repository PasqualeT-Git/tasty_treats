// TODO: Create a LoginModel to perform a login
  // TODO: The component must perform a POST request on the back-end to verify the user details
  // TODO: The component should give a feedback for the unsuccess operation  

import React, { useState } from "react";
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

export const LoginModel = (props) => {
  //* Define a user state obj that contains user details
  const [ user, setUser ] = useState({})
  
  //* Define a state for the collapsing feedback status
  const [ open, setOpen ] = useState(false) 

  //* Create a custom hook that perform state update tothe user obj 
  const handleChange = (e) => {
    const data = {...user}

    data[e.target.name] = e.target.value 

    setUser(data)
  }

  //* Define a custom hook that handles the login 
  //* performing a POST req in the back-end for verification 
  const handleLogin = async () => {
    const endpoint = `http://localhost:${props.back}/login`

    const res = await axios.post(endpoint, user)
    const result = await res.data.success

    if (result) {
      props.setUser(true)
    } else {
      setOpen(true)

      await new Promise(resolve => setTimeout(resolve, 3000));

      setOpen(false)
    }
  }
 
  return (
    <div className="container">
      <h2>Log in</h2>
      <hr />
      <form id="login-form">
        <FormControl className="margin-form" id="contact-form">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input      label="username"
                        id="username"
                        color="warning"
                        name="username"
                        value={user.usernname}
                        onChange={handleChange}
                        required/>
          </FormControl>
          <FormControl className="margin-form">
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input      label="Password"
                        type="password"
                        id="password"
                        color="warning"
                        name="password"
                        value={user.email}
                        onChange={handleChange}
                        required/>
          </FormControl>
          <Button style={{marginTop:"24px"}}
                  className="button" 
                  variant="contained" 
                  color="warning"
                  onClick={handleLogin}>Submit</Button>
          <Collapse in={open} style={{marginTop: "32px"}}>
            <Alert severity="error" color="error" disabled>
              Wrong username and/or password, please try again!
            </Alert>
          </Collapse>
      </form>
    </div>
  )
}