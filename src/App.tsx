import styled from 'styled-components';

import OrderBookTable from './modules/order-book/components/OrderBookTable';
import { useOrderBook } from './modules/order-book/hooks/useOrderBook';
import {
  getAsksOrderBookTableData,
  getBidsOrderBookTableData,
} from './modules/order-book/utils';
import { useLatestTradePriceRecord } from './modules/trade/hooks/useLatestTradePriceRecord';

const MAX_DISPLAYED_ORDERS = 8;

function App() {
  const { data, loading } = useOrderBook();
  const displayedAsksData = getAsksOrderBookTableData(
    data.asks.orders
      .sort((a, b) => b.price - a.price)
      .slice(0, MAX_DISPLAYED_ORDERS),
  );
  const displayedBidsData = getBidsOrderBookTableData(
    data.bids.orders
      .sort((a, b) => b.price - a.price)
      .slice(0, MAX_DISPLAYED_ORDERS),
  );

  const { data: latestPriceRecord, loading: latestPriceLoading } =
    useLatestTradePriceRecord();

  return (
    <Wrapper>
      {loading || latestPriceLoading ? (
        'Loading...'
      ) : (
        <OrderBookTable
          asks={displayedAsksData}
          bids={displayedBidsData}
          priceRecord={latestPriceRecord}
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export default App;
