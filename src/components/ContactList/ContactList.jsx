import React, { Component } from 'react';
import './ContactList.scss';
import Contact from '../Contact/Contact';
// import ReactPagenation from '../ReactPagenation/ReactPagenation';

export class ContactList extends Component {
  render() {
    const { contacts, deleteContact, editContact, ReactPagenation, } = this.props;
    return (
      <div className='row py-5 d-flex justify-content-center'>
        <div className='col-8 d-flex gap-3 justify-content-center'>
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <Contact
                key={contact.id}
                contact={contact}
                deleteContact={deleteContact}
                editContact={editContact}
                ReactPagenation={ReactPagenation}
              />
            ))
          ) : (
            <div className='d-flex justify-content-center'>
              <h2>No contacts</h2>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ContactList;
