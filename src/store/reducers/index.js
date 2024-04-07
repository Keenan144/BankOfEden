// reducers/index.js
import { combineReducers } from 'redux';

import billsReducer from './Bills';
import choresReducer from "./Chores";
import TransactionReducer from "./Transactions";
import WalletReducer from './Wallet';

const rootReducer = combineReducers({
    bills: billsReducer,
    chores: choresReducer,
    transactions: TransactionReducer,
    wallet: WalletReducer,
});

export default rootReducer;
