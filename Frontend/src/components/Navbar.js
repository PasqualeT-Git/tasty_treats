// TODO: Create a Navbar component for make easier the navigation;
  // TODO: The component must contain a contact anchor that lead to the contact us form
  // TODO: The component must have an icon that bring to the admin/cobtacts panel

import "./navbar.css"
import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Navbar = () => {
  return (
    <nav>
      <img src={process.env.PUBLIC_URL + "/tasty_logo.svg"} id="tastyLogo" alt="The company logo" />
      <ul>
        <li className="Menu">
          <a href="/404">MENU</a>
        </li>
        <li className="About">
          <a href="/404">ABOUT</a>
        </li>
        <li className="Locations">
          <a href="/404">LOCATIONS</a>
        </li>
        <li className="Contacts">
          <a href="/contact-us">CONTACTS</a>
        </li>
      </ul>
      <a href="/contacts" style={{margin: "12px"}}><AccountCircleIcon/></a>
    </nav>
  )
}