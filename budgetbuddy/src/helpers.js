// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

//create Expense
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