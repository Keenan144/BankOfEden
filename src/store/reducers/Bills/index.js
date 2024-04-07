import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from "../../api";

export const fetchBills = createAsyncThunk('bills/fetchBills', async () => {
    return api.fetchMonthlyBills();
});

const initialState = {
    monthlyBills: [],
};

const billsSlice = createSlice({
    name: 'bills',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchBills.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBills.fulfilled, (state, action) => {
                state.loading = false;
                state.monthlyBills = action.payload;
            })
            .addCase(fetchBills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});

export const {
    payMonthlyBill,
} = billsSlice.actions;
export default billsSlice.reducer;
