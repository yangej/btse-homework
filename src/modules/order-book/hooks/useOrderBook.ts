import { useCallback, useEffect, useRef, useState } from 'react';

import { useWebSocketsContext } from '@/modules/common/web-sockets/hooks/useWebSocketsContext';
import { OSSWebSocketResponse } from '@/modules/common/web-sockets/types';

import { Order, OrderPair } from '../types';
import { toOrder } from '../utils';

const useOrdersData = () => {
  const mapRef = useRef<Map<string, Order>>(new Map());
  const [list, setList] = useState<Order[]>([]);

  const update = useCallback((pairs: OrderPair[]) => {
    for (const [price, size] of pairs) {
      const newOrder = toOrder([price, size]);

      if (!mapRef.current.has(price)) {
        if (newOrder.size === 0) continue;

        mapRef.current.set(price, newOrder);

        continue;
      }

      if (newOrder.size === 0) {
        mapRef.current.delete(price);

        continue;
      }

      mapRef.current.set(price, newOrder);
    }

    setList(Array.from(mapRef.current.values()));
  }, []);

  return [list, update] as const;
};

export const useOrderBook = () => {
  const [askOrdersData, updateAskOrdersData] = useOrdersData();
  const [bidOrdersData, updateBidOrdersData] = useOrdersData();

  const { ossWebSocket } = useWebSocketsContext();

  useEffect(() => {
    if (!ossWebSocket.ready) return;

    ossWebSocket.subscribe('update:BTCPFC_0');
  }, [ossWebSocket, ossWebSocket.ready]);

  useEffect(() => {
    if (!ossWebSocket.ready || !ossWebSocket.message) return;

    const response: OSSWebSocketResponse = JSON.parse(ossWebSocket.message);

    if (response.topic !== 'update:BTCPFC_0') return;

    if (response.prevSeqNum >= response.seqNum) {
      ossWebSocket.unsubscribe('update:BTCPFC_0');
      ossWebSocket.subscribe('update:BTCPFC_0');

      return;
    }

    updateAskOrdersData(response.data.asks);
    updateBidOrdersData(response.data.bids);
  }, [
    ossWebSocket,
    ossWebSocket.message,
    ossWebSocket.ready,
    updateAskOrdersData,
    updateBidOrdersData,
  ]);

  return {
    loading: !ossWebSocket.ready,
    data: {
      asks: askOrdersData,
      bids: bidOrdersData,
    },
  } as const;
};
