"use strict";
// import cryptoData from "../dist/data/crpytoData.json"
let cryptoData = [
    {
        "abbreviation": "doge",
        "name": "Dogecoin",
        "market": [
            {
                "name": "Robinhood",
                "date": "2021-06-22",
                "average_cost": 0.3011,
                "quantity": 372.00
            },
            {
                "name": "Binance",
                "date": "2021-07-08",
                "average_cost": 0.2,
                "quantity": 499
            },
        ]
    },
    {
        "abbreviation": "etc",
        "name": "Ethereum Classic",
        "market": [
            {
                "name": "Robhinhood",
                "date": "2021-06-22",
                "average_cost": 54.60,
                "quantity": 1.847649
            },
            {
                "name": "Binance",
                "date": "2021-07-08",
                "average_cost": 48.0,
                "quantity": 10.40
            }
        ]
    },
    {
        "abbreviation": "btc",
        "name": "Bitcoin",
        "market": [
            {
                "name": "Robhinhood",
                "date": "2021-06-25",
                "average_cost": 32362.46,
                "quantity": 0.0000309
            },
            {
                "name": "Binance",
                "date": "2021-07-08",
                "average_cost": 32500,
                "quantity": 0.015385
            }
        ]
    },
    {
        "abbreviation": "eth",
        "name": "Ethereum",
        "market": [
            {
                "name": "Robhinhood",
                "date": "2021-06-22",
                "average_cost": 2399.95,
                "quantity": 0.20835
            },
            {
                "name": "Binance",
                "date": "2021-07-08",
                "average_cost": 2100,
                "quantity": 0.47619
            },
            {
                "name": "Binance",
                "date": "2021-07-12",
                "average_cost": 1900,
                "quantity": 0.20578
            }
        ]
    },
    {
        "abbreviation": "ltc",
        "name": "Litecoin",
        "market": [
            {
                "name": "Robhinhood",
                "date": "2021-06-22",
                "average_cost": 162.44,
                "quantity": 2.46268969
            }
        ]
    },
    {
        "abbreviation": "vet",
        "name": "VeChain",
        "market": [
            {
                "name": "Binance",
                "date": "2021-07-02",
                "average_cost": 0.0859,
                "quantity": 3492
            },
            {
                "name": "Binance",
                "date": "2021-07-08",
                "average_cost": 0.0768,
                "quantity": 6628
            }
        ]
    },
    {
        "abbreviation": "vtho",
        "name": "VeThor Token",
        "market": [
            {
                "name": "Binance",
                "date": "2021-07-02",
                "average_cost": 0.0067,
                "quantity": 29850
            }
        ]
    },
    {
        "abbreviation": "ada",
        "name": "Cardano",
        "market": [
            {
                "name": "Binance",
                "date": "2021-07-05",
                "average_cost": 1.40,
                "quantity": 143
            },
            {
                "name": "Binance",
                "date": "2021-07-09",
                "average_cost": 1.3000,
                "quantity": 384.6
            },
            {
                "name": "Binance",
                "date": "2021-07-12",
                "average_cost": 1.3000,
                "quantity": 76.5
            }
        ]
    }
];
let allData;
let bodyWrapper = document.querySelector(".bodyWrapper");
let cryptoTable = document.createElement("div");
cryptoTable.classList.add("cryptoTable");
bodyWrapper.append(cryptoTable);
let headerRow = document.createElement("div");
headerRow.classList.add("crpytoHeaderRow");
headerRow.style.display = "grid";
let columns = ["symbol", "averagePrice", "currentPrice", "percentageChange", "cost", "equity", "totalReturn"];
headerRow.style.gridTemplateColumns = `repeat(${columns.length}, 1fr)`;
columns.forEach(p => {
    let item = document.createElement("div");
    item.innerHTML = p;
    headerRow.append(item);
});
cryptoTable.append(headerRow);
function createRow(_coin, allData) {
    let symbol = _coin["abbreviation"];
    let item = allData.filter((p) => p.symbol == symbol)[0];
    let totalQuantity;
    if (_coin["market"].length == 1) {
        totalQuantity = _coin["market"][0]["quantity"];
    }
    else {
        totalQuantity = _coin["market"].reduce((x, y) => x.quantity + y.quantity);
    }
    let equity;
    if (_coin["market"].length == 1) {
        equity = _coin["market"][0]["quantity"] * item["current_price"];
    }
    else {
        equity = _coin["market"].reduce((x, y) => x["quantity"] * item["current_price"] + y["quantity"] * item["current_price"]);
    }
    let cost;
    if (_coin["market"].length == 1) {
        cost = _coin["market"][0]["quantity"] * _coin["market"][0]["average_cost"];
        console.log(177, cost);
    }
    else {
        cost = _coin["market"].reduce((x, y) => x["quantity"] * x["average_cost"] + y["quantity"] * y["average_cost"]);
        console.log(cost);
    }
    let totalReturn = equity - cost;
    let row = document.createElement("div");
    row.classList.add("crpytoRow");
    row.style.display = "grid";
    row.style.gridTemplateColumns = `repeat(${columns.length}, 1fr)`;
    let symbolColumn = document.createElement("div");
    symbolColumn.innerHTML = symbol;
    let averagePriceColumn = document.createElement("div");
    averagePriceColumn.innerHTML = `${cost / totalQuantity}`;
    let currentPriceColumn = document.createElement("div");
    currentPriceColumn.innerHTML = item["current_price"];
    let percentageChangeColumn = document.createElement("div");
    percentageChangeColumn.innerHTML = `${(item["current_price"] * totalQuantity - cost) / cost * 100}`;
    let costColumn = document.createElement("div");
    costColumn.innerHTML = `${cost}`;
    let equityColumn = document.createElement("div");
    equityColumn.innerHTML = `${equity}`;
    let totalReturnColumn = document.createElement("div");
    totalReturnColumn.innerHTML = `${totalReturn}`;
    row.append(symbolColumn, averagePriceColumn, currentPriceColumn, percentageChangeColumn, costColumn, equityColumn, totalReturnColumn);
    cryptoTable.append(row);
}
let getDataButton = document.createElement("button");
getDataButton.innerHTML = "getData";
function fetchDataFromGecko() {
    fetch("/allCrpytoData")
        .then(response => response.json())
        .then(data => {
        let allData = data.data;
        Array.from(cryptoTable.children).forEach((row, i) => { if (i != 0)
            row.remove(); });
        cryptoData.forEach(_coin => createRow(_coin, allData));
    });
}
fetchDataFromGecko();
setInterval(fetchDataFromGecko, 5000);
bodyWrapper.append(getDataButton);
