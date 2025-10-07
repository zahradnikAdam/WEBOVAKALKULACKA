// New, more robust calculator script: parses comma as decimal, adds event listeners,
// shows errors and formats results neatly.
document.addEventListener('DOMContentLoaded', () => {
    const num1El = document.getElementById('num1');
    const num2El = document.getElementById('num2');
    const resultEl = document.getElementById('result');
    const errorEl = document.getElementById('error');
    const btnAdd = document.getElementById('btnAdd');
    const btnSub = document.getElementById('btnSub');
    const btnMul = document.getElementById('btnMul');
    const btnDiv = document.getElementById('btnDiv');

    function parseInput(val) {
        if (val == null) return NaN;
        const trimmed = String(val).trim();
        if (trimmed === '') return NaN;
        // allow Czech decimal comma
        const normalized = trimmed.replace(',', '.');
        return parseFloat(normalized);
    }

    function showResult(text) {
        errorEl.textContent = '';
        resultEl.textContent = `Výsledek: ${text}`;
    }
    function showError(msg) {
        resultEl.textContent = '';
        errorEl.textContent = msg;
    }

    function formatNumber(n) {
        if (!Number.isFinite(n)) return String(n);
        if (Number.isInteger(n)) return String(n);
        // limit precision but avoid scientific notation for typical use
        return parseFloat(n.toPrecision(12)).toString().replace(/\.0+$|(?<=\.[0-9]+?)0+$/,'');
    }

    function calculateOp(op) {
        const num1 = parseInput(num1El.value);
        const num2 = parseInput(num2El.value);

        if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
            showError('Prosím zadejte platná čísla do obou polí. Můžete použít čárku i tečku jako desetinnou.');
            return;
        }

        let res;
        switch (op) {
            case 'add': res = num1 + num2; break;
            case 'subtract': res = num1 - num2; break;
            case 'multiply': res = num1 * num2; break;
            case 'divide':
                if (num2 === 0) { showError('Nelze dělit nulou'); return; }
                res = num1 / num2; break;
            default:
                showError('Neznámá operace');
                return;
        }

        showResult(formatNumber(res));
    }

    btnAdd.addEventListener('click', () => calculateOp('add'));
    btnSub.addEventListener('click', () => calculateOp('subtract'));
    btnMul.addEventListener('click', () => calculateOp('multiply'));
    btnDiv.addEventListener('click', () => calculateOp('divide'));

    // allow Enter in second field to perform addition by default
    num2El.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') calculateOp('add');
    });
});