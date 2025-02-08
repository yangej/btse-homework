import { Order, OrderBook, OrderBookResponse, OrderPair } from './types';

export const getBids = (pairs: OrderPair[]): OrderBook['bids'] => {
  const result: Order[] = [];

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

export const getAsks = (pairs: OrderPair[]): OrderBook['asks'] => {
  const result: Order[] = [];

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

export const toOrderBook = (response: OrderBookResponse): OrderBook => {
  const bids = getBids(response.data.bids);
  const asks = getAsks(response.data.asks);

  return {
    bids,
    asks,
  };
};
