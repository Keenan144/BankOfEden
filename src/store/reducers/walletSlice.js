import { createSlice } from '@reduxjs/toolkit';
import {chores} from "./util/chores";
import {bills} from "./util/bills"

const initialState = {
    availableBalance: 0,
    transactionRecords: [],
    monthlyBills: bills,
    chores
};

const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        updateAvailableBalance: (state, action) => {
            state.availableBalance += action.payload;
        },
        recordTransaction: (state, action) => {
            state.transactionRecords.push(action.payload);
        },
        payMonthlyBill: (state, action) => {
            const { id, amount } = action.payload;
            const billIndex = state.monthlyBills.findIndex(bill => bill.id === id);
            if (billIndex !== -1) {
                const bill = state.monthlyBills[billIndex];
                state.availableBalance -= amount;
                if (!bill.paid) {
                    bill.paid = true;
                    state.transactionRecords.push({
                        type: 'Bill Paid',
                        description: bill.name,
                        amount: amount,
                        transactionType: 'withdrawal'
                    });
                }
            }
        },
        completeChore: (state, action) => {
            const { id, value } = action.payload;
            const chore = state.chores.find(chore => chore.id === id);
            if (chore && !chore.completed) {
                chore.completed = true;
                state.availableBalance += value; // Update available balance
                state.transactionRecords.push({
                    type: 'Chore Completed',
                    description: chore.task,
                    amount: value,
                    transactionType: value > 0 ? 'deposit' : 'withdrawal'
                });
            }
        }
    },
});

export const { updateAvailableBalance, recordTransaction, payMonthlyBill, completeChore } = walletSlice.actions;
export default walletSlice.reducer;
