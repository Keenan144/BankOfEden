import React from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment'; // Import moment.js for date formatting

import './styles.css'; // Import CSS for styling

const Transactions = () => {
    // Get transaction records from Redux store
    const completedTransactions = useSelector(state => state.wallet.completedTransactions);
    const pendingTransactions = useSelector(state => state.wallet.pendingTransactions);

    return (
        <div className="transactions" data-testid="transactions-component">
            <h2>Transaction Records</h2>
            <ul className="transaction-list">
                {completedTransactions.map((transaction, index) => (
                    <li key={`completed-transaction-${index}`} className="transaction-item">
                        <div className={`transaction-type ${transaction.transactionType}`}>
                            {transaction.transactionType}
                        </div>
                        <div className="transaction-details">
                            <div className="transaction-description">{transaction.type}: <strong>{transaction.description}</strong></div>
                            <div className="transaction-date">{moment(transaction.date).format('MMM DD, YYYY')}</div>
                        </div>
                        <div className={`transaction-amount ${transaction.type}`}>
                            {transaction.transactionType === 'deposit' ? '+' : '-'} ${transaction.amount.toFixed(2)}
                        </div>
                    </li>
                ))}
                {pendingTransactions.map((transaction, index) => (
                    <li key={`pending-transaction-${index}`} className="transaction-item">
                        <div className={`transaction-type pending`}>
                            Pending
                        </div>
                        <div className="transaction-details" style={{opacity: 0.5}}>
                            <div className="transaction-description">{transaction.type}: <strong>{transaction.description}</strong></div>
                            <div className="transaction-date">{moment(transaction.date).format('MMM DD, YYYY')}</div>
                        </div>
                        <div className={`transaction-amount`} style={{opacity: 0.5}}>
                            {transaction.transactionType === 'deposit' ? '+' : '-'} ${transaction.amount.toFixed(2)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
