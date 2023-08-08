import React, { Component } from 'react';

import './AddContact.scss';
import { Modal } from 'react-bootstrap';

export class AddContact extends Component {
  render() {
    const {
      person,
      contactToEdit,
      handleSubmit,
      handleChange,
      show,
      cancelModal,
    } = this.props;
    const { firstName, lastName, phone } = person;
    return (
      <Modal show={show} onHide={cancelModal}>
        <Modal.Header closeButton onClick={cancelModal}>
          <Modal.Title>
            {contactToEdit === null ? 'Edit contact' : 'New contact'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row d-flex justify-content-center'>
            <div className='col-6'>
              <form className='w-full'>
                <div className='form-froup'>
                  <label className='form-label' htmlFor='firstName'>
                    First name
                  </label>
                  <input
                    className='form-control mb-3'
                    type='text'
                    name='firstName'
                    id='firstName'
                    value={firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-froup'>
                  <label className='form-label' htmlFor='lastName'>
                    Last name
                  </label>
                  <input
                    className='form-control mb-3'
                    type='text'
                    name='lastName'
                    id='lastName'
                    value={lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className='form-froup'>
                  <label className='form-label' htmlFor='phone'>
                    Phone number
                  </label>
                  <input
                    className='form-control mb-3'
                    type='tel'
                    name='phone'
                    id='phone'
                    value={phone}
                    onChange={handleChange}
                  />
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex gap-3'>
            <button className='btn btn-secondary w-100' onClick={cancelModal}>
              Cancel
            </button>
            <button className='btn btn-primary w-100' onClick={handleSubmit}>
              Save
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddContact;
