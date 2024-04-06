import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";

import "./styles.css";
import {payMonthlyBill} from "../../store/reducers/walletSlice";


const UpcomingBills = () => {
    const dispatch = useDispatch();

    const monthlyBills = useSelector(state => state.wallet.monthlyBills);
    const availableBalance = useSelector(state => state.wallet.availableBalance);

    const unpaidBills = monthlyBills.filter(bill => !bill.paid);
    const totalBillsAmount = unpaidBills.reduce((total, bill) => total + bill.amount, 0);

    const payBill = (bill) => {
        if (bill.paid === false) {
            dispatch(payMonthlyBill({ id: bill.id, amount: bill.amount }));
        }
    };

    return (
        <div className="upcoming-bills" data-testid="upcoming-bills-component">
            <h2>Upcoming Bills</h2>
            <p>Available Balance: ${availableBalance.toFixed(2)}</p>
            <ul className="bill-list">
                {monthlyBills.map(bill => (
                    <li key={`bill-${bill.id}`} className={`bill-item`} onClick={() => payBill(bill)}>
                        <div className={`bill-info ${bill.paid ? 'paid' : ''}`}>
                            <div className="bill-header">
                                <span className="bill-name">{bill.name}</span>
                                <span className="bill-amount">${bill.amount}</span>
                            </div>
                            <div className="bill-footer">
                                <span className="bill-due-date">Due Date: {bill.dueDate}</span>
                                <span className="days-until-due">3 days left</span> {/* Example days left */}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {totalBillsAmount > availableBalance && (
                <p className="warning">Warning: Insufficient funds to pay upcoming bills!</p>
            )}
        </div>
    );
};

export default UpcomingBills;
