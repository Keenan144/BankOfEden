import React from "react";
import ChoreItem from "./choreItem"; // Assuming ChoreItem is in the same directory
import "./styles.css";
import {useSelector} from "react-redux";

function noMoreChores() {
    return <div className="no-more-chores-container">No more chores available</div>
}

function ChoresTable() {
    const chores = useSelector(state => state.wallet.chores);
    const choreList = () => {
        if (chores.length > 0) {
            return (
                <ul className="task-list">
                    {chores.map(chore => (
                        <ChoreItem key={`chore-${chore.id}`} chore={chore} />
                    ))}
                </ul>
            );
        } else {
            return noMoreChores();
        }
    };

    return (
        <div data-testid="chores-component">
            <h2>Earn Money!</h2>
            {choreList()}
        </div>
    );
}

export default ChoresTable;
