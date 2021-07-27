declare let cryptoData: {
    abbreviation: string;
    name: string;
    market: {
        name: string;
        date: string;
        average_cost: number;
        quantity: number;
    }[];
}[];
declare let allData: any;
declare let bodyWrapper: HTMLDivElement;
declare let cryptoTable: HTMLDivElement;
declare let headerRow: HTMLDivElement;
declare let columns: string[];
declare function createRow(_coin: any, allData: any): void;
declare let getDataButton: HTMLButtonElement;
declare function fetchDataFromGecko(): void;
