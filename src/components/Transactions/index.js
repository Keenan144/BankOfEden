import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from "../../store/reducers/Transactions";
import moment from 'moment'; // Import moment.js for date formatting

import './styles.css';

const Transactions = () => {
    const dispatch = useDispatch();
    const transactions = useSelector(state => state.transactions.all);
    const loading = useSelector(state => state.transactions.loading);

    useEffect(() => {
        dispatch(fetchTransactions());
    }, [dispatch]);

    if (loading) {
        return <div className="loading-animation">Loading...</div>;
    }

    if (!transactions.length) {
        return (
            <div className="transactions" data-testid="transactions-component">
                <h2>Transaction Records</h2>
                <p>No transactions found. Transactions more than 30 days old are deleted.</p>
            </div>
        );
    }

    return (
        <div className="transactions" data-testid="transactions-component">
            <h2>Transactions</h2>
            <ul className="transaction-list">
                {transactions.map((transaction, index) => (
                    <li key={`completed-transaction-${index}`} className="transaction-item">
                        <div className={`transaction-type ${transaction.transaction_type}`}>
                            {transaction.transaction_type}
                        </div>
                        <div className="transaction-details">
                            <div className="transaction-description">{transaction.type}: <strong>{transaction.description}</strong></div>
                            <div className="transaction-date">{moment(transaction.date).format('MMM DD, YYYY')}</div>
                        </div>
                        <div className={`transaction-amount ${transaction.type}`}>
                            {transaction.transaction_type === 'deposit' ? '+' : '-'} ${transaction.amount}
                        </div>
                    </li>
                ))}
                {transactions.map((transaction, index) => (
                    <li key={`pending-transaction-${index}`} className="transaction-item">
                        <div className={`transaction-type pending`}>
                            Pending
                        </div>
                        <div className="transaction-details" style={{ opacity: 0.5 }}>
                            <div className="transaction-description">{transaction.type}: <strong>{transaction.description}</strong></div>
                            <div className="transaction-date">{moment(transaction.date).format('MMM DD, YYYY')}</div>
                        </div>
                        <div className={`transaction-amount`} style={{ opacity: 0.5 }}>
                            {transaction.transaction_type === 'deposit' ? '+' : '-'} ${transaction.amount}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
