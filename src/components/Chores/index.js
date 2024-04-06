import React from 'react';
import ChoresTable from './choresTable';

const Chores = () => {
    // Fetching chores from the Redux store

    return (
        <div className="bank-app">
            <ChoresTable />
        </div>
    );
};

export default Chores;
