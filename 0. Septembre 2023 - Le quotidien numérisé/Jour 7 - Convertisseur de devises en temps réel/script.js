document.addEventListener('DOMContentLoaded', function() {
    const amount = document.getElementById("amount");
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    const convertButton = document.getElementById("convert");
    const result = document.getElementById("result");

    // Charger les devises disponibles
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option = document.createElement("option");
                option.value = currency;
                option.textContent = currency;
                from.appendChild(option.cloneNode(true));
                to.appendChild(option);
            });
        })
        .catch(error => console.error("Erreur:", error));

    convertButton.addEventListener("click", function() {
        const amountValue = amount.value;
        const fromCurrency = from.value;
        const toCurrency = to.value;

        if (!amountValue || !fromCurrency || !toCurrency) {
            result.textContent = "Veuillez remplir tous les champs";
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency];
                const convertedAmount = (amountValue * rate).toFixed(2);
                result.textContent = `${amountValue} ${fromCurrency} est égal à ${convertedAmount} ${toCurrency}`;
            })
            .catch(error => console.error("Erreur:", error));
    });
});