// TODO: Create and export a ContactsTable component that show all the contacts in a table using an MUI component.
// TODO: Create a delete function that delete a contact passing its id;
  // TODO: Create a feedback when the contact is succsessfully deleted.

import React from "react";
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import DeleteIcon from '@mui/icons-material/Delete';

export const ContactsTable = (props) => {
  //* Create an array of objs to set the headers for the MUI table component
  const columns = [
    {field: 'name', headerName: 'Name', flex: 0.75},
    {field: 'email', headerName: 'Email', flex: 1},
    {field: 'message', headerName: 'Message', flex: 1.5},
    {field: 'subscribe', headerName: 'Subscribed', flex:0.25, type: 'boolean'},
    {field: 'actions', type: 'actions', flex:0.25, getActions: (GridRowParams) => [
      <GridActionsCellItem icon={<DeleteIcon />} onClick={props.handleDelete} label='Delete' />
    ]}
  ]

  return (
    <div style={{ height: 600, width: '80%', margin: "0 auto"}}>
      <DataGrid 
        getRowId={row => row._id}
        rows={props.contacts}
        columns={columns}
        pageSize={9}
        rowsPerPageOptions={[5]}
        styles={{body: { backgroundColor: 'cyan' }}}
      />
      <Collapse in={props.open}>
        <Alert severity="success" color="warning" disabled>
          Contact deleted!
        </Alert>
      </Collapse>
    </div>
  )
}