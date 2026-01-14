console.log("Finova JS connected");

const input = document.getElementById("symbolInput");
const button = document.getElementById("fetchBtn");
const priceText = document.getElementById("priceText"); 
const stockText = document.getElementById("stocktext"); 

const ctx = document.getElementById("priceChart").getContext("2d");
const priceChart = new Chart(ctx, {
    type: "line",
    data: {
        labels: [], 
        datasets: [
            {
                label: "Price (USD)",
                data: [],
                borderColor: "blue",
                borderWidth: 2,
                fill: false
            }
        ]
    },
    options: {
        responsive: true,
        scales: {
            x: { title: { display: true, text: "Date" } },
            y: { title: { display: true, text: "Price USD" } }
        }
    }
});

const stockApiKey = "3af591a9bf2f45f596e2c4b0195b3e53";

button.addEventListener("click", async () => {
    const symbol = input.value.trim();
    if (!symbol) {
        priceText.textContent = "Enter a crypto or stock symbol!";
        stockText.textContent = "";
        priceText.style.color = "red";
        return;
    }

    priceText.textContent = "Loading crypto...";
    stockText.textContent = "Loading stock...";
    priceText.style.color = "black";
    stockText.style.color = "black";

    try {
        const cryptoRes = await fetch(`https://api.coingecko.com/api/v3/coins/${symbol.toLowerCase()}/market_chart?vs_currency=usd&days=30`);
        const cryptoData = await cryptoRes.json();

        if (cryptoData.prices) {
            const prices = cryptoData.prices;

            const labels = prices.map(item => {
                const date = new Date(item[0]);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            });

            const priceValues = prices.map(item => item[1]);

            priceChart.data.labels = labels;
            priceChart.data.datasets[0].data = priceValues;
            priceChart.update();

            const currentPrice = priceValues[priceValues.length - 1];
            const firstPrice = priceValues[0];

            priceText.textContent = `Current ${symbol} price: $${currentPrice.toFixed(2)}`;
            priceText.style.color = currentPrice > firstPrice ? "#038203ff" : currentPrice < firstPrice ? "red" : "black";
            stockText.textContent = "";
        } else {
            const stockRes = await fetch(`https://api.twelvedata.com/time_series?symbol=${symbol.toUpperCase()}&interval=1day&outputsize=30&apikey=${stockApiKey}`);
            const stockData = await stockRes.json();

            if (stockData.values) {
                const values = stockData.values.reverse();

                const labels = values.map(item => {
                    const date = new Date(item.datetime);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const day = String(date.getDate()).padStart(2, "0");
                    return `${year}-${month}-${day}`;
                });

                const priceValues = values.map(item => parseFloat(item.close));

                priceChart.data.labels = labels;
                priceChart.data.datasets[0].data = priceValues;
                priceChart.update();

                const currentPrice = priceValues[priceValues.length - 1];
                const firstPrice = priceValues[0];

                stockText.textContent = `Current ${symbol.toUpperCase()} price: $${currentPrice.toFixed(2)}`;
                stockText.style.color = currentPrice > firstPrice ? "green" : currentPrice < firstPrice ? "red" : "black";
                priceText.textContent = "";
            } else {
                priceText.textContent = "";
                stockText.textContent = "Symbol not found!";
                stockText.style.color = "red";
            }
        }
    } catch (error) {
        console.error(error);
        priceText.textContent = "Error fetching crypto!";
        stockText.textContent = "Error fetching stock!";
        priceText.style.color = "red";
        stockText.style.color = "red";
    }
});
