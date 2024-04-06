import { createSlice } from '@reduxjs/toolkit';
import { chores } from "./util/chores";
import { bills } from "./util/bills";

const initialState = {
    availableBalance: 0,
    completedTransactions: [],
    pendingTransactions: [],
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
            state.completedTransactions.push(action.payload);
        },
        payMonthlyBill: (state, action) => {
            const { id, amount } = action.payload;
            const billIndex = state.monthlyBills.findIndex(bill => bill.id === id);
            if (billIndex !== -1) {
                const bill = state.monthlyBills[billIndex];
                state.availableBalance -= amount;
                if (!bill.paid) {
                    bill.paid = true;
                    state.completedTransactions.push({
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
            const choreIndex = state.chores.findIndex(chore => chore.id === id);
            if (choreIndex !== -1) {
                const chore = state.chores[choreIndex];
                if (!chore.completed) {
                    chore.completed = true;
                    state.pendingTransactions.push({
                        id: chore.id,
                        type: 'Chore Completed',
                        description: chore.task,
                        amount: value,
                        transactionType: value > 0 ? 'deposit' : 'withdrawal'
                    });
                }
            }
        },
        approveCompletedChore: (state, action) => {
            const { id } = action.payload;
            const choreIndex = state.pendingTransactions.findIndex(chore => chore.id === id);
            if (choreIndex !== -1) {
                const chore = state.pendingTransactions[choreIndex];
                state.pendingTransactions.splice(choreIndex, 1);
                state.completedTransactions.push(chore);
            }
        }
    },
});

export const { updateAvailableBalance, recordTransaction, payMonthlyBill, completeChore, approveCompletedChore } = walletSlice.actions;
export default walletSlice.reducer;
