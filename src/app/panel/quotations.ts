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

export interface Quotation {
  currencies: Currency[];
  bitcoin: Bitcoin[];
  stocks: Stock[];
}
