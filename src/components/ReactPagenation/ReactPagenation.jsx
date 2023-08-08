import React, { Component } from 'react'
import ContactList from '../ContactList/ContactList';

export class ReactPagenation extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        currentPage: 1,
        itemsPerPage: 5,
      }
    }

    handlePageChange = (pageNumber) => {
        this.setState({ currentPage: pageNumber });
      };

  render() {
    const { currentPage, itemsPerPage, displayContacts } = this.state;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = displayContacts.slice(indexOfFirstItem, indexOfLastItem);

    const renderContacts = currentItems.map((contact) => (
      <div key={contact.id}>
        <p>{contact.firstName} {contact.lastName} - {contact.phone}</p>
      </div>
    ));

    const pageNumbers = Math.ceil(displayContacts.length / itemsPerPage);

    return (
        <div className='container py-5'>
        <ContactList contacts={renderContacts} /> 
        <nav>
          <ul className='pagination'>
            {Array.from({ length: pageNumbers }, (_, index) => (
              <li key={index} className='page-item'>
                <button
                  onClick={() => this.handlePageChange(index + 1)}
                  className={`page-link ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    );
  }
    
  }


export default ReactPagenation