import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchBalance} from "../store/reducers/Wallet";

const Wallet = () => {
    const dispatch = useDispatch();
    const availableBalance = useSelector(state => state.wallet.availableBalance);

    useEffect(() => {
        // Dispatch fetchChores action to fetch chores data when the component mounts
        dispatch(fetchBalance());
    }, [dispatch]); // Add dispatch as a dependency to avoid lint warnings

    return (
        <div className="wallet" data-testid="wallet-component">
            <p><strong>Account Balance: ${availableBalance}</strong></p>
        </div>
    );
};

export default Wallet;