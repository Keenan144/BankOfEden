const express = require('express');
const pool = require('./db'); // Import the PostgreSQL client instance
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/chores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM chores');
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
});

app.put('/chores/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {task, pay_rate, reset_interval, completed_at, approved_at, reset_at, completed} = req.body;
        const updatedChore = await pool.query(
            'UPDATE chores SET task = $1, pay_rate = $2, reset_interval = $3, completed_at = $4, approved_at = $5, reset_at = $6, completed = $7 WHERE id = $8 RETURNING *',
            [task, pay_rate, reset_interval, completed_at, approved_at, reset_at, completed, id]);

        if (completed === true) {
            // If completed is true, add the chore to the pending transactions table
            await pool.query('INSERT INTO transactions (chore_id, created_at, updated_at, type, status, comment, amount) VALUES ($1, $2, $3, $4, $5, $6, $7)', [updatedChore[0].id, 'Chore Completed', updatedChore[0].task, updatedChore[0].value, value > 0 ? 'deposit' : 'withdrawal']);
        }

        res.json(updatedChore[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
});

app.get('/transactions', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM transactions');
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
})

app.get('/bills', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bills');
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
})

app.get('/wallet', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM wallet');
        res.json(result);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({error: 'Server error'});
    }
})

const PORT = 5004;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
