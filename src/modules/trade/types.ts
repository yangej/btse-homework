export type TradeHistoryResponse = {
  topic: 'tradeHistoryApi';
  data: [
    {
      symbol: 'BTCPFC';
      side: 'SELL' | 'BUY';
      size: number;
      price: number;
      tradeId: number;
      timestamp: number;
    },
  ];
};
