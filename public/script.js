document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    const fetchExpenses = async () => {
        const response = await fetch('/expenses');
        const expenses = await response.json();
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${expense.description} - $${expense.amount} - ${new Date(expense.date).toLocaleDateString()}
                <button onclick="deleteExpense(${expense.id})">Delete</button>
            `;
            expenseList.appendChild(li);
        });
    };

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;
        const date = document.getElementById('date').value;

        const response = await fetch('/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ description, amount, date })
        });

        if (response.ok) {
            form.reset();
            fetchExpenses();
        } else {
            console.error('Failed to add expense');
        }
    });

    window.deleteExpense = async (id) => {
        const response = await fetch(`/expenses/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            fetchExpenses();
        } else {
            console.error('Failed to delete expense');
        }
    };

    fetchExpenses();
});
