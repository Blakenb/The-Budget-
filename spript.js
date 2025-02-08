document.getElementById("budget-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const expenseName = document.getElementById("expense-name").value;
  const expenseAmount = parseFloat(
    document.getElementById("expense-amount").value
  );

  console.log("Expense Name:", expenseName);
  console.log("Expense Amount:", expenseAmount);

  if (expenseName && !isNaN(expenseAmount)) {
    console.log("Adding expense...");
    addExpense(expenseName, expenseAmount.toFixed(2));
    updateTotal(expenseAmount);
    addExpenseToList(expenseName, expenseAmount.toFixed(2));
    saveExpense(expenseName, expenseAmount.toFixed(2));
    clearForm();
  } else {
    console.log("Invalid input");
  }
});

document.getElementById("clear-all").addEventListener("click", function () {
  console.log("Clearing all expenses...");
  clearAllExpenses();
});

function addExpense(name, amount) {
  console.log("Adding expense to table...");
  const table = document
    .getElementById("expense-table")
    .getElementsByTagName("tbody")[0];
  const newRow = table.insertRow();

  const nameCell = newRow.insertCell(0);
  const amountCell = newRow.insertCell(1);

  nameCell.textContent = name;
  amountCell.textContent = `$${amount}`;
  console.log("Expense added to table:", name, amount);
}

function updateTotal(amount) {
  console.log("Updating total...");
  const totalElement = document.getElementById("total-amount");
  const currentTotal = parseFloat(totalElement.textContent);
  console.log("Current Total:", currentTotal);
  console.log("Amount to Add:", amount);
  const newTotal = currentTotal + parseFloat(amount);
  console.log("New Total:", newTotal);

  totalElement.textContent = newTotal.toFixed(2);
  localStorage.setItem("totalAmount", newTotal.toFixed(2));
  console.log("Total updated:", newTotal.toFixed(2));
}

function addExpenseToList(name, amount) {
  console.log("Adding expense to list...");
  const expenseList = document.getElementById("expense-list");
  const listItem = document.createElement("li");
  listItem.textContent = `${name}: $${amount}`;
  expenseList.appendChild(listItem);
  console.log("Expense added to list:", name, amount);
}

function saveExpense(name, amount) {
  console.log("Saving expense...");
  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.push({ name, amount });
  localStorage.setItem("expenses", JSON.stringify(expenses));
  console.log("Expense saved:", name, amount);
}

function loadExpenses() {
  console.log("Loading expenses...");
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach((expense) => {
    addExpense(expense.name, expense.amount);
    addExpenseToList(expense.name, expense.amount);
  });

  const totalAmount = localStorage.getItem("totalAmount") || "0";
  document.getElementById("total-amount").textContent = totalAmount;
  console.log("Expenses loaded. Total amount:", totalAmount);
}

function clearForm() {
  console.log("Clearing form...");
  document.getElementById("expense-name").value = "";
  document.getElementById("expense-amount").value = "";
  console.log("Form cleared");
}

function clearAllExpenses() {
  console.log("Clearing all expenses...");
  localStorage.removeItem("expenses");
  localStorage.setItem("totalAmount", "0");

  document
    .getElementById("expense-table")
    .getElementsByTagName("tbody")[0].innerHTML = "";
  document.getElementById("expense-list").innerHTML = "";
  document.getElementById("total-amount").textContent = "0";
  console.log("All expenses cleared");
}

// Load expenses when the page loads
window.onload = loadExpenses;
