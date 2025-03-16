import { useDispatch, useSelector } from 'react-redux';
import { Contact } from '../Contact/Contact';
import { deleteContact } from '../../redux/contacts/contactsOps';

import {
  selectError,
  selectFilteredContacts,
  selectLoading,
} from '../../redux/contacts/contactsSlice';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={() => dispatch(deleteContact(contact.id))}
        />
      ))}
    </ul>
  );
};
