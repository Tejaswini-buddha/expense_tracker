const apiUrl = "http://localhost:5000/expenses";  // Backend API URL

// Fetch Expenses from API
async function fetchExpenses() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";
    
    data.forEach(expense => {
        const div = document.createElement("div");
        div.classList.add("expense-item");
        div.innerHTML = `
            <span><strong>${expense.name}</strong>: ₹${expense.amount} (${expense.category})</span>
            <button class="delete-btn" onclick="deleteExpense('${expense._id}')">Delete</button>
        `;
        expenseList.appendChild(div);
    });
}

// Add Expense to API
async function addExpense() {
    const name = document.getElementById("expenseTitle").value;
    const amount = document.getElementById("expenseAmount").value;
    const category = document.getElementById("expenseCategory").value;

    if (!name || !amount || !category) {
        alert("Please fill all fields!");
        return;
    }

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, amount, category })
    });

    if (response.ok) {
        fetchExpenses();
        document.getElementById("expenseTitle").value = "";
        document.getElementById("expenseAmount").value = "";
        document.getElementById("expenseCategory").value = "";
    } else {
        alert("Error adding expense.");
    }
}

// Delete Expense from API
async function deleteExpense(id) {
    const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });

    if (response.ok) {
        fetchExpenses();
    } else {
        alert("Error deleting expense.");
    }
}

// Load Expenses on Page Load
fetchExpenses();
