import React, {useEffect} from 'react';
import ChoresTable from './choresTable';
import {useDispatch} from "react-redux";
import {fetchChores} from "../../store/reducers/Chores";

const Chores = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch fetchChores action to fetch chores data when the component mounts
        dispatch(fetchChores());
    }, [dispatch]); // Add dispatch as a dependency to avoid lint warnings


    return (
        <div className="bank-app">
            <ChoresTable />
        </div>
    );
};

export default Chores;
