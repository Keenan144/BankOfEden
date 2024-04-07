import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { fetchBills } from '../../store/reducers/Bills';
import './styles.css';

const UpcomingBills = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBills());
    }, [dispatch]);

    const monthlyBills = useSelector(state => state.bills.monthlyBills);
    const availableBalance = useSelector(state => state.wallet.availableBalance);

    const calculateDaysUntilDue = (dueDate) => {
        const today = moment();
        const due = moment(dueDate);
        return due.diff(today, 'days');
    };

    const payBill = (bill) => {
        if (!bill.paid) {
            // Dispatch action to pay the bill
        }
    };

    const isAmountDueAlert = (amount, daysUntilDue) => {
        console.log(amount > availableBalance && daysUntilDue <= 7)
        return amount > availableBalance && daysUntilDue <= 7;
    };

    return (
        <div className="upcoming-bills" data-testid="upcoming-bills-component">
            <h2>Upcoming Bills</h2>
            <p>Available Balance: ${availableBalance}</p>
            <ul className="bill-list">
                {monthlyBills.map(bill => (
                    <li key={`bill-${bill.id}`} className={`bill-item`} onClick={() => payBill(bill)}>
                        <div className={`bill-info ${bill.paid ? 'paid' : ''}`}>
                            <div className="bill-header">
                                <span className="bill-name">{bill.name}</span>
                                <span className={`bill-amount ${isAmountDueAlert(bill.amount, calculateDaysUntilDue(bill.next_payment_due)) ? 'alert' : ''}`}>
                                    ${bill.amount}
                                </span>
                            </div>
                            <div className="bill-footer">
                                <span className="bill-due-date">Due Date: {moment(bill.next_payment_due).format('MMM DD, YYYY')}</span>
                                <span className="days-until-due">{calculateDaysUntilDue(bill.next_payment_due)} days left</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingBills;
