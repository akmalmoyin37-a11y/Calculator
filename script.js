
let history = [];

function insert(num) {
    document.getElementById('result').value += num;
}

function clearScreen() {
    document.getElementById('result').value = '';
}

function deleteLast() {
    let result = document.getElementById('result').value;
    document.getElementById('result').value = result.slice(0, -1);
}

function calculate() {
    try {
        let expression = document.getElementById('result').value;
        let result = eval(expression);
        document.getElementById('result').value = result;
        addToHistory(expression, result);
    } catch (e) {
        alert('Invalid expression');
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

function addToHistory(expression, result) {
    history.push({ expression, result });
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    for (const item of history) {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.expression} = ${item.result}`;
        historyList.appendChild(listItem);
    }
}

function clearHistory() {
    history = [];
    updateHistory();
}

function copyToClipboard() {
    const result = document.getElementById('result').value;
    navigator.clipboard.writeText(result).then(() => {
        alert('Copied to clipboard');
    });
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
        insert(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '.') {
        insert(key);
    } else if (key === 'Enter') {
        calculate();
    } else if (key === 'Backspace') {
        deleteLast();
    } else if (key === 'Escape') {
        clearScreen();
    }
});
