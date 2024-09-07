import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, removeContact, editContact } from '../redux/contactsSlice';
import styled from 'styled-components';

const ContactList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: '', email: '', phone: '', id: null });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(editContact(form));
      setIsEditing(false);
    } else {
      dispatch(addContact({ ...form, id: Date.now() }));
    }
    setForm({ name: '', email: '', phone: '' });
  };

  const handleEdit = (contact) => {
    setForm(contact);
    setIsEditing(true);
  };

  return (
    <Container>
      <h2>Contact List</h2>
      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />
        <button type="submit">{isEditing ? 'Edit' : 'Add'} Contact</button>
      </Form>

      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            <span>{contact.name} - {contact.email} - {contact.phone}</span>
            <button onClick={() => handleEdit(contact)}>Edit</button>
            <button onClick={() => dispatch(removeContact(contact.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </Container>
  );
};

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  input {
    margin: 5px 0;
    padding: 10px;
    font-size: 16px;
  }
  button {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }
`;

export default ContactList;
