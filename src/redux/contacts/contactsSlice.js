// 1. Створити початковий стан
// 2. Створити слайс
// 3. Дати йому імʼя
// 4. Передати йому стан
// 5. Прописати reducers: {}
// 6. Експортувати counterReducer = slice.reducer
// 7. Підключити в сторі новий слайс замість редьюсера старого
// 8. Додати функції у редюсерс
// 9. Експортувати екшени (наші маленькі фукнції з reducers) з slice.actions
// 10. Використати нові функції в компонентах вже імпортуючи їх з слайсу

import { createSelector, createSlice } from '@reduxjs/toolkit';

import { deleteContact, fetchContacts, addContact } from './contactsOps';
import { selectNameFilter } from '../filters/filtersSlice';
import { logoutThunk } from '../auth/authOperations';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filter) =>
    contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
);

const slice = createSlice({
  name: 'contacts',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});
export const contactsReducer = slice.reducer;
// export const { fetchContacts, setError, setLoading } = slice.actions;
