// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// Generate random color
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;

    return `${existingBudgetLength * 34} 65%, 50%`
}

// create budget helper function
export const createBudget = ({
    name, amount
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? [];
    return localStorage.setItem("budgets",
        JSON.stringify([...existingBudgets, newItem]))
}

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

export const calculateTotalSpendings = () => {
    // get all expenses
    const expenses = fetchData("expenses") ?? [];

    // loop through all expenses
    const totalSpendings = expenses.reduce((acc, expense) => {
        // add the current amount to my total
        return acc += expense.amount

    }, 0)
    return totalSpendings;
}

// create Expense
export const waait = () => new Promise(res => setTimeout (res, Math.random() * 800))

export const createExpense = ({
    name, amount, budgetId
}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }
    const existingExpenses = fetchData("expenses") ?? [];
    return localStorage.setItem("expenses",
        JSON.stringify([...existingExpenses, newItem]))
}

// FORMATTING
export const formatDateToLocaleString = (epoch) => 
new Date(epoch).toLocaleDateString();


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