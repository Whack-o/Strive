export function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}

export function writeData(key, variable, value) {
    // Get the existing data from localStorage, select variable, update with new value
    let data = JSON.parse(localStorage.getItem(key));

    if (!data) console.error("No data found for key:", key).then(() => { return null });

    data[variable] = value;

    localStorage.setItem(key, JSON.stringify(data));

    return data;
}