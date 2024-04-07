import walletReducer, { updateAvailableBalance, recordTransaction, payMonthlyBill, completeChore, approveCompletedChore } from './index';
const defaultState = {
    "availableBalance": 0,
    "chores": [
        {
            "completed": false,
            "id": 1,
            "task": "Wash Dishes and Load Dishwasher",
            "value": 2.5
        },
        {
            "completed": false,
            "id": 9,
            "task": "Unload Dishwasher",
            "value": 1
        },
        {
            "completed": false,
            "id": 2,
            "task": "Take out the trash",
            "value": 1
        },
        {
            "completed": false,
            "id": 3,
            "task": "Make bed",
            "value": 1
        },
        {
            "completed": false,
            "id": 4,
            "task": "Brush teeth",
            "value": 1
        },
        {
            "completed": false,
            "id": 5,
            "task": "Scoop Dog Poop",
            "value": 5
        },
        {
            "completed": false,
            "id": 6,
            "task": "Put Clothes Away",
            "value": 1.5
        },
        {
            "completed": false,
            "id": 7,
            "task": "Put Clothes Out For Tomorrow",
            "value": 0.5
        },
        {
            "completed": false,
            "id": 8,
            "task": "Mop Floors",
            "value": 1
        },
        {
            "completed": false,
            "id": 10,
            "task": "Vacuum Room",
            "value": 1
        },
        {
            "completed": false,
            "id": 11,
            "task": "Vacuum House",
            "value": 2.5
        }
    ],
    "completedTransactions": [],
    "monthlyBills": [
        {
            "amount": 4,
            "dueDate": "01",
            "id": 1,
            "name": "Rent",
            "paid": false,
            "rate": "monthly"
        },
        {
            "amount": 1,
            "dueDate": "15",
            "id": 2,
            "name": "Xbox/TV Subscription",
            "paid": false,
            "rate": "monthly"
        },
        {
            "amount": 1,
            "dueDate": "22",
            "id": 3,
            "name": "Phone",
            "paid": false,
            "rate": "monthly"
        },
        {
            "amount": 1,
            "dueDate": "22",
            "id": 4,
            "name": "Tablet",
            "paid": false,
            "rate": "monthly"
        }
    ],
    "pendingTransactions": []
}
describe('Wallet Reducer', () => {
    it('should return the initial state', () => {
        expect(walletReducer(undefined, {})).toEqual(defaultState);
    });

    it('should update available balance correctly', () => {
        const initialState = { availableBalance: 0 };
        const updatedState = walletReducer(initialState, updateAvailableBalance(100));
        expect(updatedState.availableBalance).toEqual(100);
    });

    it('should record transaction correctly', () => {
        const initialState = { completedTransactions: [] };
        const transaction = { type: 'Deposit', description: 'Test', amount: 50, transactionType: 'deposit' };
        const updatedState = walletReducer(initialState, recordTransaction(transaction));
        expect(updatedState.completedTransactions).toContainEqual(transaction);
    });

    it('should pay monthly bill correctly', () => {
        const initialState = { availableBalance: 100, completedTransactions: [], monthlyBills: [{ id: 1, name: 'Test Bill', amount: 50, paid: false }] };
        const updatedState = walletReducer(initialState, payMonthlyBill({ id: 1, amount: 50 }));
        expect(updatedState.availableBalance).toEqual(50);
        expect(updatedState.monthlyBills[0].paid).toBe(true);
        expect(updatedState.completedTransactions.length).toEqual(1);
        expect(updatedState.completedTransactions[0]).toEqual({
            type: 'Bill Paid',
            description: 'Test Bill',
            amount: 50,
            transactionType: 'withdrawal'
        });
    });

    it('should complete chore and add to pending transactions', () => {
        const initialState = { chores: [{ id: 1, task: 'Test Chore', completed: false }], pendingTransactions: [] };
        const updatedState = walletReducer(initialState, completeChore({ id: 1, value: 20 }));
        expect(updatedState.pendingTransactions.length).toEqual(1);
        expect(updatedState.pendingTransactions[0]).toEqual({ id: 1, type: 'Chore Completed', description: 'Test Chore', amount: 20, transactionType: 'deposit' });
    });

    it('should approve completed chore and move to completed transactions', () => {
        const initialState = { pendingTransactions: [{ id: 1, type: 'Chore Completed', description: 'Test Chore', amount: 20, transactionType: 'deposit' }], completedTransactions: [] };
        const updatedState = walletReducer(initialState, approveCompletedChore({ id: 1 }));
        expect(updatedState.pendingTransactions.length).toEqual(0);
        expect(updatedState.completedTransactions.length).toEqual(1);
        expect(updatedState.completedTransactions[0]).toEqual({ id: 1, type: 'Chore Completed', description: 'Test Chore', amount: 20, transactionType: 'deposit' });
    });
});
