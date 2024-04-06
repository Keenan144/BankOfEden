import React from 'react';
import {useSelector} from "react-redux";


const Wallet = () => {
    const availableBalance = useSelector(state => state.wallet.availableBalance);

    return (
        <div className="wallet" data-testid="wallet-component">
            <p><strong>Account Balance: ${availableBalance.toFixed(2)}</strong></p>
        </div>
    );
};

export default Wallet;