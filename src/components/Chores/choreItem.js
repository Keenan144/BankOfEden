import React from "react";

import "./styles.css";

function ChoreItem({ chore }) {

    return (
        <li className={`task-item ${chore.completed ? 'completed' : ''}`} key={`task-item-${chore.id}`} onClick={() => {}}>
            <div className="task-checkbox">
                <span className={`checkmark ${chore.completed ? 'checked' : ''}`}></span>
            </div>
            <div className="task-description">{chore.task}</div>
            <div className="task-amount">${chore.pay_rate}</div>
        </li>
    );
}

export default ChoreItem;
