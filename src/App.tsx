import styled from 'styled-components';

import { mockOderBookResponse } from './mocks/mock-order-book-data';
import OrderBookTable from './modules/order-book/components/OrderBookTable';
import { toOrderBookTableData } from './modules/order-book/utils';

function App() {
  const mockTableData = toOrderBookTableData({
    asks: mockOderBookResponse.data.asks,
    bids: mockOderBookResponse.data.bids,
  });

  return (
    <Wrapper>
      <OrderBookTable asks={mockTableData.asks} bids={mockTableData.bids} />
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
