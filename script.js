let debounceTimer;
let isLoading = false;

function debounceCalculateTip() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(calculateTip, 300);
}

function formatBRL(input) {
    let value = input.value.replace(/[\D]+/g, '');
    value = (value / 100).toFixed(2);
    value = value.replace('.', ',').replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    input.value = 'R$ ' + value;
    debounceCalculateTip();
}

function clearInput() {
    document.getElementById('gross-profit-value').value = '';
    calculateTip();
}

function showLoading(isLoading) {
    if (isLoading) {
        document.getElementById('tax').classList.add('loading');
        document.getElementById('net-profit').classList.add('loading');
        document.getElementById('manager').classList.add('loading');
        document.getElementById('waiter').classList.add('loading');
    } else {
        document.getElementById('tax').classList.remove('loading');
        document.getElementById('net-profit').classList.remove('loading');
        document.getElementById('manager').classList.remove('loading');
        document.getElementById('waiter').classList.remove('loading');
    }
}

function calculateTip() {
    showLoading(true);

    const grossProfitInput = document.getElementById('gross-profit-value').value.replace(/[R$ \.]/g, '').replace(',', '.');
    const grossProfitValue = parseFloat(grossProfitInput);
    const grossProfitError = document.getElementById('gross-profit-input-error');

    if (isNaN(grossProfitValue) || grossProfitValue <= 0) {
        grossProfitError.innerText = "Por favor, insira um valor válido de lucro bruto.";
        showLoading(false);
        return;
    } else {
        grossProfitError.innerText = "";
    }

    const taxRate = 0.20;
    const tax = grossProfitValue * taxRate;
    document.getElementById('tax-value').innerText = tax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const netProfit = grossProfitValue - tax;
    document.getElementById('net-profit-value').innerText = netProfit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const managerShare = netProfit * 0.10;
    const waiterShare = netProfit * 0.90;
    document.getElementById('manager-value').innerText = managerShare.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('waiter-value').innerText = waiterShare.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    showLoading(false);
}
