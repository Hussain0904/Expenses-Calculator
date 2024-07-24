const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

let expenses = [];
let idCounter = 1;

app.post('/expenses', (req, res) => {
    const expense = {
        id: idCounter++,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date || new Date().toISOString()
    };
    expenses.push(expense);
    console.log('Expense added:', expense);
    res.send(expense);
});

app.get('/expenses', (req, res) => {
    res.send(expenses);
});

app.delete('/expenses/:id', (req, res) => {
    expenses = expenses.filter(e => e.id !== parseInt(req.params.id));
    res.send({ message: 'Expense deleted' });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
