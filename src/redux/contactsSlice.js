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

import { deleteContact, fetchData, addContact } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

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
  // reducers: {
  //   deleteContact: (state, action) => {
  //     state.items = state.items.filter(item => item.id !== action.payload);
  //   },
  //   addContact: (state, action) => {
  //     state.items.push({ id: nanoid(), ...action.payload });
  //   },
  //   fetchContacts: (state, action) => {
  //     state.items = action.payload;
  //     state.loading = false;
  //   },
  //   setError: (state, action) => {
  //     state.error = action.payload;
  //   },
  //   setLoading: (state, action) => {
  //     state.loading = action.payload;
  //   },
  // },
  extraReducers: builder => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchData.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchData.rejected, (state, action) => {
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
