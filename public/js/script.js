
document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    expenseForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const expenseInput = document.getElementById('expense-input').value;
        if (expenseInput.trim() !== '') {
            addExpense(expenseInput);
            expenseForm.reset();
        }
    });

    function addExpense(expense) {
        const li = document.createElement('li');
        li.textContent = expense;
        expenseList.appendChild(li);
    }
});
