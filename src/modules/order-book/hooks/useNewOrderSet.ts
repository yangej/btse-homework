import { useEffect, useRef, useState } from 'react';

import { OrderBookTableDataItem } from '../types';

export const useNewOrderSet = (data: OrderBookTableDataItem[]) => {
  const [newSet, setNewSet] = useState(new Set<number>());
  const seenSet = useRef(new Set<number>());

  useEffect(() => {
    const prices = data.map((item) => item.price);

    if (seenSet.current.size === 0) {
      seenSet.current = new Set(prices);
      return;
    }

    const newPrices = prices.filter((price) => !seenSet.current.has(price));
    setNewSet(new Set(newPrices));
    seenSet.current = new Set([...seenSet.current, ...newPrices]);
  }, [data]);

  return newSet;
};
