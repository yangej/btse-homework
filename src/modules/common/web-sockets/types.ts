import { OrderBookResponse } from '@/modules/order-book/types';
import { TradeHistoryResponse } from '@/modules/trade/types';

export type OSSWebSocketResponse = OrderBookResponse;

export type BaseWebSocketResponse = TradeHistoryResponse;
