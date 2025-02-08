import { useEffect, useState } from 'react';

import { useWebSocketsContext } from '@/modules/common/web-sockets/hooks/useWebSocketsContext';
import { BaseWebSocketResponse } from '@/modules/common/web-sockets/types';

import { PriceRecord } from '../types';

export const useLatestTradePriceRecord = () => {
  const { baseWebSocket } = useWebSocketsContext();

  const [currPrice, setCurrPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);

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

    if (currPrice !== newPrice) {
      setPrevPrice(currPrice);
    }
  }, [baseWebSocket.message, baseWebSocket.ready, currPrice, prevPrice]);

  return {
    loading: !baseWebSocket.ready,
    data,
  };
};
