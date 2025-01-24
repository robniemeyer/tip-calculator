document.addEventListener('DOMContentLoaded', function() {
    const grossProfitInput = document.getElementById('gross-profit-value');
    const taxValue = document.getElementById('tax-value');
    const netProfitValue = document.getElementById('net-profit-value');
    const managerValue = document.getElementById('manager-value');
    const waiterValue = document.getElementById('waiter-value');
    const grossProfitError = document.getElementById('gross-profit-input-error');

    let debounceTimer;

    grossProfitInput.addEventListener('input', formatBRL);
    document.getElementById('clear-button').addEventListener('click', clearInput);

    function debounceCalculateTip() {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(calculateTip, 300);
    }

    function formatBRL(event) {
        let input = event.target;
        let value = input.value.replace(/[\D]+/g, ''); 

        if (value === '') {
            input.value = '';
            return;
        }

        let formattedValue = (parseInt(value, 10) / 100).toFixed(2).replace('.', ',');
        formattedValue = formattedValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        input.value = `R$ ${formattedValue}`;

        debounceCalculateTip();
    }

    function clearInput() {
        grossProfitInput.value = '';
        calculateTip();
    }

    function calculateTip() {
        const inputValue = grossProfitInput.value.replace(/[R$ \.]/g, '').replace(',', '.');
        const grossProfitValue = parseFloat(inputValue);

        if (isNaN(grossProfitValue) || grossProfitValue <= 0) {
            grossProfitError.innerText = "Por favor, insira um valor válido de lucro bruto.";
            return;
        } else {
            grossProfitError.innerText = "";
        }

        const taxRate = 0.20;
        const tax = grossProfitValue * taxRate;

        taxValue.innerText = tax.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const netProfit = grossProfitValue - tax;
        netProfitValue.innerText = netProfit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const managerShare = netProfit * 0.10;
        const waiterShare = netProfit * 0.90;
        managerValue.innerText = managerShare.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        waiterValue.innerText = waiterShare.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
});
