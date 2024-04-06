import React from "react";
import { useDispatch } from "react-redux";
import { completeChore } from "../../store/reducers/walletSlice";
import "./styles.css";

function ChoreItem({ chore }) {
    const dispatch = useDispatch();

    const handleChoreCompletion = () => {
        if (!chore.completed) {
            dispatch(completeChore({ id: chore.id, value: chore.value }));
        }
    };

    return (
        <li className={`task-item ${chore.completed ? 'completed' : ''}`} key={`task-item-${chore.id}`} onClick={handleChoreCompletion}>
            <div className="task-checkbox">
                <span className={`checkmark ${chore.completed ? 'checked' : ''}`}></span>
            </div>
            <div className="task-description">{chore.task}</div>
            <div className="task-amount">${chore.value}</div>
        </li>
    );
}

export default ChoreItem;
