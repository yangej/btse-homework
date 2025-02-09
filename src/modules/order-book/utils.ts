import {
  Order,
  OrderBookTableData,
  OrderBookTableDataItem,
  OrderPair,
} from './types';

export const getBids = (orders: Order[]): OrderBookTableData => {
  const result: OrderBookTableDataItem[] = [];

  let lastSize = 0;

  for (let i = 0; i < orders.length; i++) {
    const { size, ...rest } = orders[i];
    const total = lastSize + size;
    lastSize = total;

    result.push({
      ...rest,
      size,
      total,
    });
  }

  return { data: result, totalSize: lastSize };
};

export const getAsks = (orders: Order[]): OrderBookTableData => {
  const result: OrderBookTableDataItem[] = [];

  let lastSize = 0;

  for (let i = orders.length - 1; i >= 0; i--) {
    const { size, ...rest } = orders[i];
    const total = lastSize + size;
    lastSize = total;

    result.unshift({
      ...rest,
      size,
      total,
    });
  }

  return { data: result, totalSize: lastSize };
};

export const toOrder = ([price, size]: OrderPair): Order => {
  return { price: Number(price), size: Number(size), prevSize: 0 };
};
