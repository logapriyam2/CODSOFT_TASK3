// script.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let previousInput = '';
    let operator = null;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                // Clear the current input only and update the display to 0
                currentInput = '';
                display.innerText = '0';
            } else if (value === 'DEL') {
                // Delete the last character in the current input
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput || '0';
            } else if (value === '=') {
                // Perform the calculation if there is an operator and both inputs
                if (operator && currentInput && previousInput) {
                    currentInput = calculate(previousInput, currentInput, operator);
                    display.innerText = currentInput;
                    previousInput = '';
                    operator = null;
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Set the operator if there's an existing input
                if (currentInput) {
                    previousInput = currentInput;
                    currentInput = '';
                    operator = value;
                } else if (previousInput) {
                    // Allow operator change if there is a previous input
                    operator = value;
                }
            } else {
                // Append the value to the current input and update the display
                currentInput += value;
                display.innerText = currentInput;
            }
        });
    });

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+': return (a + b).toString();
            case '-': return (a - b).toString();
            case '*': return (a * b).toString();
            case '/': return (a / b).toString();
            default: return b.toString();
        }
    }
});
