import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


import * as api from '../../api';

export const fetchBalance = createAsyncThunk('wallet/fetchBalance', async () => {
    return api.fetchBalance();
});

const initialState = {
    availableBalance: null,
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBalance.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.availableBalance = action.payload.available_balance; // Assuming action.payload contains fetched chores
            })
            .addCase(fetchBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Assuming action.error.message contains the error message
            })
    }
});

export default walletSlice.reducer;
