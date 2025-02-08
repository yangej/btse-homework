import {
  Order,
  OrderBookTableData,
  OrderBookTableDataItem,
  OrderPair,
} from './types';

export const getBids = (pairs: OrderPair[]): OrderBookTableData['bids'] => {
  const result: OrderBookTableDataItem[] = [];

  let lastSize = 0;

  for (let i = 0; i < pairs.length; i++) {
    const [price, size] = pairs[i];
    const total = lastSize + Number(size);
    lastSize = total;

    result.push({
      price: Number(price),
      size: Number(size),
      total,
    });
  }

  return { data: result, totalSize: lastSize };
};

export const getAsks = (pairs: OrderPair[]): OrderBookTableData['asks'] => {
  const result: OrderBookTableDataItem[] = [];

  let lastSize = 0;

  for (let i = pairs.length - 1; i >= 0; i--) {
    const [price, size] = pairs[i];
    const total = lastSize + Number(size);
    lastSize = total;

    result.unshift({
      price: Number(price),
      size: Number(size),
      total,
    });
  }

  return { data: result, totalSize: lastSize };
};

export const toOrder = ([price, size]: OrderPair): Order => {
  return { price: Number(price), size: Number(size) };
};

export const toOrderBookTableData = (data: {
  asks: OrderPair[];
  bids: OrderPair[];
}): OrderBookTableData => {
  const bids = getBids(data.bids);
  const asks = getAsks(data.asks);

  return {
    bids,
    asks,
  };
};
