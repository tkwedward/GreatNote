console.log("crypto is crypto")
// import cryptoData from "../dist/data/crpytoData.json"

let cryptoData = [
  { "abbreviation": "doge", "name": "Ethereum Classic","average_cost": 0.3011, "quantity": 372.00},
  { "abbreviation": "etc", "name": "Ethereum Classic","average_cost": 54.60, "quantity": 1.847649},
  { "abbreviation": "btc", "name": "Bitcoin","average_cost": 32362.46, "quantity": 0.0000309},
  { "abbreviation": "eth", "name": "Ethereum","average_cost": 2399.95, "quantity": 0.20835},
  { "abbreviation": "ltc", "name": "Litecoin","average_cost": 162.44, "quantity": 2.46268969},
  { "abbreviation": "vet", "name": "VeChain","average_cost": 0.0859, "quantity": 3492},
  { "abbreviation": "vtho", "name": "VeThor Token","average_cost": 0.0067, "quantity": 29850},
  { "abbreviation": "ada", "name": "Cardano","average_cost": 1.40, "quantity": 143}
]


let allData: any
let bodyWrapper = <HTMLDivElement> document.querySelector(".bodyWrapper")

let cryptoTable = document.createElement("div")
cryptoTable.classList.add("cryptoTable")
bodyWrapper.append(cryptoTable)

let headerRow = document.createElement("div")
headerRow.classList.add("crpytoHeaderRow")
headerRow.style.display = "grid"

let columns = ["symbol", "averagePrice", "currentPrice",  "percentageChange", "cost", "equity", "totalReturn"]

headerRow.style.gridTemplateColumns = `repeat(${columns.length}, 1fr)`
columns.forEach(p=>{
    let item = document.createElement("div")
    item.innerHTML = p
    headerRow.append(item)
})
cryptoTable.append(headerRow)

function createRow(_coin:any, allData: any){
  let symbol = _coin["abbreviation"]
  let item = allData.filter((p:any)=>p.symbol==symbol)[0]
  let equity:number = _coin["quantity"] * item["current_price"]
  let cost:number = _coin["quantity"] * _coin["average_cost"]
  let totalReturn = equity - cost

  console.log("round x")
  console.log(symbol, equity, cost, totalReturn)

  let row = document.createElement("div")
  row.classList.add("crpytoRow")
  row.style.display = "grid"
  row.style.gridTemplateColumns = `repeat(${columns.length}, 1fr)`

  let symbolColumn = document.createElement("div")
  symbolColumn.innerHTML = symbol

  let averagePriceColumn = document.createElement("div")
  averagePriceColumn.innerHTML = _coin["average_cost"]

  let currentPriceColumn = document.createElement("div")
  currentPriceColumn.innerHTML = item["current_price"]

  let percentageChangeColumn = document.createElement("div")
  percentageChangeColumn.innerHTML = `${(item["current_price"] - _coin["average_cost"])/_coin["average_cost"] * 100}`

  let costColumn = document.createElement("div")
  costColumn.innerHTML = `${cost}`

  let equityColumn = document.createElement("div")
  equityColumn.innerHTML = `${equity}`

  let totalReturnColumn = document.createElement("div")
  totalReturnColumn.innerHTML = `${totalReturn}`

  row.append(symbolColumn, averagePriceColumn, currentPriceColumn, percentageChangeColumn, costColumn, equityColumn, totalReturnColumn)

  cryptoTable.append(row)
}


let getDataButton = document.createElement("button")
getDataButton.innerHTML = "getData"

function fetchDataFromGecko(){
  fetch("/allCrpytoData")
    .then(response=>response.json())
    .then(data=>{
      let allData = data.data
      Array.from(cryptoTable.children).forEach((row, i)=>{ if ( i!=0 ) row.remove() })
      cryptoData.forEach(_coin=>createRow(_coin, allData))
    })
}
fetchDataFromGecko()

setInterval(fetchDataFromGecko, 5000)

bodyWrapper.append(getDataButton)
