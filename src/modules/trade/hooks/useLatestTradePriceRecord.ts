import { useEffect, useRef, useState } from 'react';

import { useWebSocketsContext } from '@/modules/common/web-sockets/hooks/useWebSocketsContext';
import { BaseWebSocketResponse } from '@/modules/common/web-sockets/types';

import { PriceRecord } from '../types';

const SAME_PRICE_THRESHOLD = 100;

export const useLatestTradePriceRecord = () => {
  const { baseWebSocket } = useWebSocketsContext();

  const [currPrice, setCurrPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);

  const countRef = useRef(0);

  const data: PriceRecord = { current: currPrice, previous: prevPrice };

  useEffect(() => {
    if (!baseWebSocket.ready) return;

    baseWebSocket.subscribe('tradeHistoryApi:BTCPFC');
  }, [baseWebSocket, baseWebSocket.ready]);

  useEffect(() => {
    if (!baseWebSocket.ready || !baseWebSocket.message) return;

    const response: BaseWebSocketResponse = JSON.parse(baseWebSocket.message);

    if (response.topic !== 'tradeHistoryApi') return;

    const newPrice = response.data[0].price;

    setCurrPrice(newPrice);

    countRef.current += 1;

    if (
      currPrice !== newPrice ||
      (currPrice === newPrice && countRef.current > SAME_PRICE_THRESHOLD)
    ) {
      setPrevPrice(currPrice);

      countRef.current = 0;
    }
  }, [baseWebSocket.message, baseWebSocket.ready, currPrice, prevPrice]);

  return {
    loading: !baseWebSocket.ready,
    data,
  };
};
