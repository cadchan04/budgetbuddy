// Local storage
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

// delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

// 

// FORMATTING

// format currency
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "USD"
    })
}