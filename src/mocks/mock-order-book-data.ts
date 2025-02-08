import { OrderBookResponse } from '@/modules/order-book/types';

export const mockOderBookResponse: OrderBookResponse = {
  topic: 'update:BTCPFC_0',
  data: {
    bids: [
      ['21664.5', '591'],
      ['21662.0', '118'],
      ['21650.0', '40'],
      ['21629.0', '461'],
      ['21623.5', '3691'],
      ['21618.0', '19838'],
      ['21617.0', '1177'],
      ['21613.5', '2730'],
    ],
    asks: [
      ['21699.0', '3691'],
      ['21693.5', '461'],
      ['21680.5', '53'],
      ['21680.0', '836'],
      ['21672.0', '40'],
      ['21669.0', '210'],
      ['21665.5', '331'],
      ['21665.0', '35'],
    ],
  },
  seqNum: 628282,
  prevSeqNum: 628281,
  type: 'snapshot',
  timestamp: 1565135165600,
  symbol: 'BTCPFC',
};
