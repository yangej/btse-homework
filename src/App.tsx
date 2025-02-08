import styled from 'styled-components';

import OrderBookTable from './modules/order-book/components/OrderBookTable';
import { useOrderBook } from './modules/order-book/hooks/useOrderBook';
import { getAsks, getBids } from './modules/order-book/utils';

const MAX_DISPLAYED_ORDERS = 8;

function App() {
  const { data, loading } = useOrderBook();
  const displayedAsksData = getAsks(
    data.asks.orders
      .sort((a, b) => b.price - a.price)
      .slice(0, MAX_DISPLAYED_ORDERS),
  );
  const displayedBidsData = getBids(
    data.bids.orders
      .sort((a, b) => b.price - a.price)
      .slice(0, MAX_DISPLAYED_ORDERS),
  );

  return (
    <Wrapper>
      {loading ? (
        'Loading...'
      ) : (
        <OrderBookTable asks={displayedAsksData} bids={displayedBidsData} />
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
