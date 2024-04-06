import React from 'react';

import Chores from './components/Chores';
import Wallet from './components/Wallet';
import UpcomingBills from './components/UpcomingBills';
import Transactions from "./components/Transactions";

import './App.css';

function App() {
    return (
        <div className="App col-12">
            <h1 style={{width: '100%', display: "block", textAlign: 'center'}}>Bank of Eden</h1>
            <div className="row">
                <div className="col-8">
                    <Chores/>
                </div>
                <div className="col-4">
                    <UpcomingBills/>
                </div>
            </div>
            <div className="row">
                <Transactions/>
            </div>
            <Wallet/>
        </div>
    );
}

export default App;
