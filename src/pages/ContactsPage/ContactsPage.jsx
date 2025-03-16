import React, { useEffect } from 'react';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { SearchBox } from '../../components/SearchBox/SearchBox';
import { ContactList } from '../../components/ContactList/ContactList';
import { useDispatch, useSelector } from 'react-redux';
import { selectError } from '../../redux/auth/selectors';
import { fetchContacts } from '../../redux/contacts/contactsOps';
import { selectContacts, selectLoading } from '../../redux/contacts/contactsSlice';

export const ContactsPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {loading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      {contacts.length > 0 && <ContactList />}
    </div>
  );
};
