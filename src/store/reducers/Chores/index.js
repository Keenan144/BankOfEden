import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../api';
import store from "../../index";

// Async thunks for interacting with the API
export const fetchChores = createAsyncThunk('chores/fetchChores', async () => {
    return api.fetchChores();
});

const initialState = {
    list: []
};

const choresSlice = createSlice({
    name: 'chores',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchChores.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChores.fulfilled, (state, action) => {
                state.loading = false;
                console.log('chores fulfilled', action.payload);
                state.list = action.payload; // Assuming action.payload contains fetched chores
            })
            .addCase(fetchChores.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Assuming action.error.message contains the error message
            })
    }
});

export default choresSlice.reducer;
