interface Monetary {
  key: string;
  buy: number;
  sell: number;
  variation: number;
}

export interface Currency extends Monetary {
  name: string;
}

export interface Bitcoin extends Monetary {
  name: string;
  format: string[];
  last: number;
}

export interface Stock extends Monetary {
  name: string;
  location: string;
}


// export interface CurrencyObject {
//   ARS: Currency;
//   BTC: Currency;
//   EUR: Currency;
//   GBP: Currency;
//   USD: Currency;
// }

// export interface BitcoinObject {
//   bitstamp: Bitcoin;
//   blockchain_info: Bitcoin;
//   coinbase: Bitcoin;
//   foxbit: Bitcoin;
//   mercadobitcoin: Bitcoin;
//   omnitrade: Bitcoin;
// }

// export interface StockObject {
//   CAC: Stock;
//   IBOVESPA: Stock;
//   NASDAQ: Stock;
//   NIKKEI: Stock;
// }

export interface Quotations {
  currencies: Currency[];
  bitcoin: Bitcoin[];
  stocks: Stock[];
}
