import React, { Component } from 'react';
import './Contacts.scss';
import AddContact from '../../components/AddContact/AddContact';
import ContactList from '../../components/ContactList/ContactList';
import { Button } from 'react-bootstrap';

export class Contacts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: JSON.parse(localStorage.getItem('contacts')) || [],
      person: {
        firstName: '',
        lastName: '',
        phone: '',
      },
      contactToEdit: null,
      show: false,
      searchText: '',
      displayContacts: [],
    };
  }

  // componentDidUpdate() {
  //   localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   let searchedContacts = this.state.contacts.filter(
  //     (contact) =>
  //       contact.firstName.toLowerCase().includes(this.state.searchText) ||
  //       contact.lastName.toLowerCase().includes(this.state.searchText) ||
  //       contact.phone.toLowerCase().includes(this.state.searchText)
  //   );
  //   this.setState({
  //     displayContacts:
  //       this.state.searchText === '' ? this.state.contacts : searchedContacts,
  //   });
  // }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  
    if (this.state.searchText !== prevState.searchText) {
      let searchedContacts = this.state.contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(this.state.searchText) ||
          contact.lastName.toLowerCase().includes(this.state.searchText) ||
          contact.phone.toLowerCase().includes(this.state.searchText)
      );
      this.setState({
        displayContacts:
          this.state.searchText === '' ? this.state.contacts : searchedContacts,
      });
    }
  }
  
  // handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete?")) {
  //     let filteredContacts = this.state.contacts.filter(
  //       (contact) => contact.id !== id
  //     );
  
  //     this.setState({
  //       contacts: filteredContacts,
  //       displayContacts: filteredContacts,
  //     });
  
  //     localStorage.setItem("contacts", JSON.stringify(filteredContacts));
  //   }
  // };
  

  handleChange = (e) => {
    if (this.state.contactToEdit === null) {
      this.setState({
        person: {
          ...this.state.person,
          [e.target.name]: e.target.value,
        },
      });
    } else {
      this.setState({
        contactToEdit: {
          ...this.state.contactToEdit,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.contactToEdit === null) {
      this.setState({
        contacts: [
          ...this.state.contacts,
          {
            id: this.state.contacts.length + 1,
            ...this.state.person,
          },
        ],
      });

      this.setState({
        person: {
          firstName: '',
          lastName: '',
          phone: '',
        },
      });
    } else {
      this.setState({
        contacts: this.state.contacts.map((contact) =>
          contact.id === this.state.contactToEdit.id
            ? this.state.contactToEdit
            : contact
        ),
      });
      this.setState({
        contactToEdit: null,
      });
    }
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  };

  deleteContact = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      let filteredContacts = this.state.contacts.filter(
        (contact) => contact.id !== id
      );

      this.setState({
        contacts: filteredContacts,
      });
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  editContact = (id) => {
    let contact = this.state.contacts.find((c) => c.id === id);
    this.setState({ contactToEdit: contact });
    this.handleShow();
  };

  handleShow = () => {
    this.setState({ show: true });
  };

  cancelModal = () => {
    this.setState({
      person: { firstName: '', lastName: '', phone: '' },
      contactToEdit: null,
      show: false,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ searchText: e.target.value.trim().toLowerCase() });
    let searchedContacts = this.state.contacts.filter(
      (contact) =>
        contact.firstName.toLowerCase().includes(this.state.searchText) ||
        contact.lastName.toLowerCase().includes(this.state.searchText) ||
        contact.phone.toLowerCase().includes(this.state.searchText)
    );
    this.setState({
      displayContacts:
        this.state.searchText === '' ? this.state.contacts : searchedContacts,
    });
  };

  render() {
    const { contactToEdit, person, show, searchText, displayContacts } =
      this.state;
    return (
      <div className='container py-5'>
        <input
          type='text'
          placeholder='Search...'
          className='form-control w-50'
          value={searchText}
          onChange={this.handleSearch}
        />
        <div className='d-flex justify-content-around pt-5 '>
          <h1>Contact list</h1>
          <Button variant='primary' onClick={this.handleShow}>
            Add contact
          </Button>
        </div>
        <AddContact
          person={contactToEdit || person}
          contactToEdit={contactToEdit}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          show={show}
          cancelModal={this.cancelModal}
        />
        <ContactList
          contacts={displayContacts}
          deleteContact={this.deleteContact}
          editContact={this.editContact}
        />
      </div>
    );
  }
}

export default Contacts;
