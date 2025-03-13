import axios from 'axios';
// import { fetchContacts, setError, setLoading } from './contactsSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://67c8bfc20acf98d07087a1fe.mockapi.io/';

export const fetchData = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const { data } = await axios.get('/contacts');
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id, thunkAPI) => {
  try {
    const { data } = await axios.delete(`/contacts/${id}`);
    return data.id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async (body, thunkAPI) => {
  try {
    const { data } = await axios.post('/contacts', body);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// export const fetchData = () => async dispatch => {
//   try {
//     dispatch(setError(false));
//     dispatch(setLoading(true));
//     const responce = await axios.get('https://67c8bfc20acf98d07087a1fe.mockapi.io/contacts');
//     dispatch(fetchContacts(responce.data));
//   } catch (error) {
//     dispatch(setError(true));
//   } finally {
//     dispatch(setLoading(false));
//   }
// };
