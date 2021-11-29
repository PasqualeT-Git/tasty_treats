// TODO: Create and export a Contatcs component;
  // TODO: The component: must render a login form to grant access to the correct user;
  // TODO: The component: must render contacts in a nice format;  

import axios from 'axios'
import React, { useState, useEffect} from "react";
import { ContactsTable } from './ContactsTable';
import { LoginModel } from './LoginModel'


export const Contacts = (props) => {
  //* Declare state and setter for user obj.
  const [ user, setUser] = useState()

  //* Declare state and setter for alert collapse.
  const [open, setOpen] = useState(false)

  //* Declare state and setter for contacts.
  const [contacts, setContacts] = useState([])
  
  //* Define the endpoint to make api requests using the rigth port passed in props.
  const apiEndpoint = `http://localhost:${props.ports.back}/contacts`

  //* Create an async function to get all the contacts on the DB from back
  //* using a POST request, then set the state with the fetched data.
  const fetchContacts = async () => {
    const res = await axios.get(apiEndpoint)
    const data = res.status === 200 ? await res.data : []
    
    setContacts(data)
  }
  
  //* Use the hook useEffect to fire once, the function to fetch 
  //* all the contacts once the component has mounted.
  useEffect(() => {
    fetchContacts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  //* Create a function to handle deleting a contact,
  //* firing a DELETE request on the back-end, passing the id as parameter.
  const handleDelete = async (e) => {
    const element = e.target.closest('div.MuiDataGrid-row')
    const id = element.dataset.id

    const res = await axios.delete(`${apiEndpoint}/${id}`)

    if (res.status === 200) {
      setOpen(true)

      setTimeout(() => {
        setOpen(false)
      }, 2000)
    }

    fetchContacts()
  }

  return (
    <>
      {!user ? <LoginModel setUser={setUser} back={props.ports.back}/> : (
        <div className="container">
          <h2>Hello Terence</h2>
          <hr />
          {contacts.length === 0 ? ( <h2>No contacts found</h2> ) : (
            <ContactsTable  contacts={contacts} 
                            open={open}
                            handleDelete={handleDelete}/>
          )}
        </div>
      )}
    </>
  )
}