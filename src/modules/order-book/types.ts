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
};

export type OrderBookTableDataItem = Order & {
  total: number;
};

export type OrderBookTableData = {
  bids: {
    data: OrderBookTableDataItem[];
    totalSize: number;
  };
  asks: {
    data: OrderBookTableDataItem[];
    totalSize: number;
  };
};
