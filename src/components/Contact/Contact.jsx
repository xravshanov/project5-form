import React, { Component } from 'react';

import './Contact.scss';

export class Contact extends Component {
  render() {
    const { contact, deleteContact, editContact } = this.props;
    return (
      <div className='card p-3 w-25'>
        <p>{contact.firstName}</p>
        <p>{contact.lastName}</p>
        <p>{contact.phone}</p>
        <div className='d-flex justify-content-end gap-2'>
          <button
            className='btn btn-sm btn-warning'
            onClick={() => editContact(contact.id)}
          >
            Edit
          </button>
          <button
            className='btn btn-sm btn-danger'
            onClick={() => deleteContact(contact.id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default Contact;
