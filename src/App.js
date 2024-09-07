import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import ContactList from './components/ContactList';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Contact Manager</h1>
        <ContactList />
      </div>
    </Provider>
  );
};

export default App;
