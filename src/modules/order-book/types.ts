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
  prevSize: number;
  size: number;
};

export type OrderBookTableDataItem = Order & {
  total: number;
};

export type OrderBookTableData = {
  data: OrderBookTableDataItem[];
  totalSize: number;
};
