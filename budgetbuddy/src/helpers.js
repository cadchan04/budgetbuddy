// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

// total spent by budget
export const calculateSpentByBudget = (budgetId) => {
    // get all expenses
    const expenses = fetchData("expenses") ?? [];

    // loop through all expenses
    const budgetSpent = expenses.reduce((acc, expense) => {
        // check if expense.id == budgetId that is passed in
        if (expense.budgetId !== budgetId) return acc

        // add the current amount to my total
        return acc += expense.amount

    }, 0)
    return budgetSpent;
}

// create Expense
export const createExpense = ({
    name, amount, budgetId
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        ammount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses",
        JSON.stringify([...existingExpenses, newItem]))
}

// FORMATTING

// formatting percentages
export const formatPercentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}

// format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })

}