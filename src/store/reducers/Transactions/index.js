import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '../../api';

export const fetchTransactions = createAsyncThunk('transactions/fetchTransactions', async () => {
    return api.fetchTransactions();
});

const initialState = {
    all: [],
    loading: false,
};

const transactionSlice = createSlice({
    name: 'transaction',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchTransactions.fulfilled, (state, action) => {
                state.loading = false;
                state.all = action.payload; // Assuming action.payload contains fetched chores
            })
            .addCase(fetchTransactions.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Assuming action.error.message contains the error message
            });
    }
});

export default transactionSlice.reducer;
