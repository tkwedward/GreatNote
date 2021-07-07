/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/crypto.ts":
/*!***********************!*\
  !*** ./src/crypto.ts ***!
  \***********************/
/***/ (() => {

eval("\nconsole.log(\"crypto is crypto\");\n// import cryptoData from \"../dist/data/crpytoData.json\"\nlet cryptoData = [\n    { \"abbreviation\": \"doge\", \"name\": \"Ethereum Classic\", \"average_cost\": 0.3011, \"quantity\": 372.00 },\n    { \"abbreviation\": \"etc\", \"name\": \"Ethereum Classic\", \"average_cost\": 54.60, \"quantity\": 1.847649 },\n    { \"abbreviation\": \"btc\", \"name\": \"Bitcoin\", \"average_cost\": 32362.46, \"quantity\": 0.0000309 },\n    { \"abbreviation\": \"eth\", \"name\": \"Ethereum\", \"average_cost\": 2399.95, \"quantity\": 0.20835 },\n    { \"abbreviation\": \"ltc\", \"name\": \"Litecoin\", \"average_cost\": 162.44, \"quantity\": 2.46268969 },\n    { \"abbreviation\": \"vet\", \"name\": \"VeChain\", \"average_cost\": 0.0859, \"quantity\": 3492 },\n    { \"abbreviation\": \"vtho\", \"name\": \"VeThor Token\", \"average_cost\": 0.0067, \"quantity\": 29850 },\n    { \"abbreviation\": \"ada\", \"name\": \"Cardano\", \"average_cost\": 1.40, \"quantity\": 143 }\n];\nlet allData;\nlet bodyWrapper = document.querySelector(\".bodyWrapper\");\nlet cryptoTable = document.createElement(\"div\");\ncryptoTable.classList.add(\"cryptoTable\");\nbodyWrapper.append(cryptoTable);\nlet headerRow = document.createElement(\"div\");\nheaderRow.classList.add(\"crpytoHeaderRow\");\nheaderRow.style.display = \"grid\";\nlet columns = [\"symbol\", \"averagePrice\", \"currentPrice\", \"percentageChange\", \"cost\", \"equity\", \"totalReturn\"];\nheaderRow.style.gridTemplateColumns = `repeat(${columns.length}, 1fr)`;\ncolumns.forEach(p => {\n    let item = document.createElement(\"div\");\n    item.innerHTML = p;\n    headerRow.append(item);\n});\ncryptoTable.append(headerRow);\nfunction createRow(_coin, allData) {\n    let symbol = _coin[\"abbreviation\"];\n    let item = allData.filter((p) => p.symbol == symbol)[0];\n    let equity = _coin[\"quantity\"] * item[\"current_price\"];\n    let cost = _coin[\"quantity\"] * _coin[\"average_cost\"];\n    let totalReturn = equity - cost;\n    console.log(\"round x\");\n    console.log(symbol, equity, cost, totalReturn);\n    let row = document.createElement(\"div\");\n    row.classList.add(\"crpytoRow\");\n    row.style.display = \"grid\";\n    row.style.gridTemplateColumns = `repeat(${columns.length}, 1fr)`;\n    let symbolColumn = document.createElement(\"div\");\n    symbolColumn.innerHTML = symbol;\n    let averagePriceColumn = document.createElement(\"div\");\n    averagePriceColumn.innerHTML = _coin[\"average_cost\"];\n    let currentPriceColumn = document.createElement(\"div\");\n    currentPriceColumn.innerHTML = item[\"current_price\"];\n    let percentageChangeColumn = document.createElement(\"div\");\n    percentageChangeColumn.innerHTML = `${(item[\"current_price\"] - _coin[\"average_cost\"]) / _coin[\"average_cost\"] * 100}`;\n    let costColumn = document.createElement(\"div\");\n    costColumn.innerHTML = `${cost}`;\n    let equityColumn = document.createElement(\"div\");\n    equityColumn.innerHTML = `${equity}`;\n    let totalReturnColumn = document.createElement(\"div\");\n    totalReturnColumn.innerHTML = `${totalReturn}`;\n    row.append(symbolColumn, averagePriceColumn, currentPriceColumn, percentageChangeColumn, costColumn, equityColumn, totalReturnColumn);\n    cryptoTable.append(row);\n}\nlet getDataButton = document.createElement(\"button\");\ngetDataButton.innerHTML = \"getData\";\nfunction fetchDataFromGecko() {\n    fetch(\"/allCrpytoData\")\n        .then(response => response.json())\n        .then(data => {\n        let allData = data.data;\n        Array.from(cryptoTable.children).forEach((row, i) => { if (i != 0)\n            row.remove(); });\n        cryptoData.forEach(_coin => createRow(_coin, allData));\n    });\n}\nfetchDataFromGecko();\nsetInterval(fetchDataFromGecko, 5000);\nbodyWrapper.append(getDataButton);\n\n\n//# sourceURL=webpack://reactInAction/./src/crypto.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/crypto.ts"]();
/******/ 	
/******/ })()
;