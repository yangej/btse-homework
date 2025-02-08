type Price = string;
type Size = string;

export type OrderPair = [Price, Size];

export type OrderBookResponse = {
  topic: string;
  data: {
    bids: OrderPair[];
    asks: OrderPair[];
  };
  seqNum: number;
  prevSeqNum: number;
  type: 'snapshot' | 'delta';
  timestamp: number;
  symbol: string;
};

export type Order = {
  price: number;
  size: number;
  total: number;
};

export type OrderBook = {
  bids: {
    data: Order[];
    totalSize: number;
  };
  asks: {
    data: Order[];
    totalSize: number;
  };
};
