import { useCallback, useEffect, useRef, useState } from 'react';

import { WEB_SOCKET_URL } from '../constants';

const MAX_RECONNECT_ATTEMPTS = 10;
const MAX_RECONNECT_DELAY = 30000;

export type WebSocketHookValue<Topic extends string> = {
  ready: boolean;
  message: string | undefined;
  subscribe: (topic: Topic, args?: string[]) => void;
  unsubscribe: (topic: Topic, args?: string[]) => void;
};

export const useWebSocket = <Topic extends string>(
  endpoint: string,
  options?: {
    reconnect?: boolean;
  },
): WebSocketHookValue<Topic> => {
  const [message, setMessage] = useState<string | undefined>();
  const [ready, setReady] = useState(false);
  const instanceRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutIdRef = useRef<ReturnType<typeof setTimeout>>(null);

  const connect = useCallback(() => {
    const webSocket = new WebSocket(endpoint);

    webSocket.onopen = () => {
      console.info('Connection to ', endpoint, 'is opened');

      if (reconnectTimeoutIdRef.current) {
        clearTimeout(reconnectTimeoutIdRef.current);
        reconnectTimeoutIdRef.current = null;
      }
      reconnectAttemptsRef.current = 0;
      setReady(true);
    };

    webSocket.onclose = () => {
      if (
        options?.reconnect &&
        reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS
      ) {
        reconnectAttemptsRef.current++;

        // NOTE: Exponential backoff
        const delay = Math.min(
          1000 * 2 ** reconnectAttemptsRef.current,
          MAX_RECONNECT_DELAY,
        );
        reconnectTimeoutIdRef.current = setTimeout(() => {
          console.info('Reconnecting to ', endpoint, '...');

          connect();
        }, delay);
      } else {
        console.info('Connection to ', endpoint, 'is closed');
      }

      instanceRef.current = null;
      setReady(false);
    };

    webSocket.onerror = (error) => {
      console.error('Connection to ', endpoint, 'failed', error);
    };

    webSocket.onmessage = (event) => {
      setMessage(event.data);
    };

    instanceRef.current = webSocket;
  }, [endpoint, options?.reconnect]);

  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutIdRef.current) {
        clearTimeout(reconnectTimeoutIdRef.current);
        reconnectTimeoutIdRef.current = null;
        reconnectAttemptsRef.current = 0;
      }

      if (
        instanceRef.current &&
        instanceRef.current.readyState === instanceRef.current.OPEN
      ) {
        instanceRef.current.close();
      }
    };
  }, [endpoint, connect]);

  const subscribe = useCallback((topic: Topic, args?: string[]) => {
    if (
      !instanceRef.current ||
      instanceRef.current.readyState !== instanceRef.current.OPEN
    )
      return;

    instanceRef.current.send(
      JSON.stringify({
        op: 'subscribe',
        args: args ? [topic, ...args] : [topic],
      }),
    );
  }, []);

  const unsubscribe = useCallback((topic: Topic, args?: string[]) => {
    if (
      !instanceRef.current ||
      instanceRef.current.readyState !== instanceRef.current.OPEN
    )
      return;

    instanceRef.current.send(
      JSON.stringify({
        op: 'unsubscribe',
        args: args ? [topic, ...args] : [topic],
      }),
    );
  }, []);

  return {
    ready,
    message,
    subscribe,
    unsubscribe,
  };
};

type OSSWebSocketSupportedTopics = 'update:BTCPFC_0';

export type OSSWebSocketType = WebSocketHookValue<OSSWebSocketSupportedTopics>;

export const useOSSWebSocket = (): OSSWebSocketType => {
  return useWebSocket(`${WEB_SOCKET_URL}/oss/futures`);
};

type BaseWebSocketSupportedTopics =
  | 'tradeHistoryApi:BTCPFC'
  | 'tradeHistoryApi';

export type BaseWebSocketType =
  WebSocketHookValue<BaseWebSocketSupportedTopics>;

export const useBaseWebSocket = (): BaseWebSocketType => {
  return useWebSocket(`${WEB_SOCKET_URL}/futures`);
};
