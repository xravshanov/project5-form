import React, { Component } from 'react';
import Contacts from './pages/Contacts/Contacts';
// import ReactPagenation from './components/ReactPagenation/ReactPagenation';

export class App extends Component {
  render() {
    return (
      <div>
        <Contacts />
        {/* <ReactPagenation/> */}
      </div>
    );
  }
}

export default App;
