import styled, { CSSProperties, useTheme } from 'styled-components';

import { numberFormatter } from '@/modules/common/formatters';

import { OrderBookTableDataItem } from '../types';

type TotalCellProps = {
  order: OrderBookTableDataItem;
  totalSize: number;
};

export const AskTotalCell = ({ order, totalSize }: TotalCellProps) => {
  const theme = useTheme();

  return (
    <Wrapper>
      {numberFormatter.format(order.total)}
      <Bar
        $percentage={order.total / totalSize}
        $background={theme.colors.ask.background.light}
      />
    </Wrapper>
  );
};

export const BidTotalCell = ({ order, totalSize }: TotalCellProps) => {
  const theme = useTheme();

  return (
    <Wrapper>
      {numberFormatter.format(order.total)}
      <Bar
        $percentage={order.total / totalSize}
        $background={theme.colors.bid.background.light}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 0;
  overflow: hidden;
`;

const Bar = styled.div<{
  $percentage: number;
  $background: CSSProperties['background'];
}>`
  position: absolute;
  height: 100%;
  width: 100%;
  transform: translateX(${(props) => `${(1 - props.$percentage) * 100}%`});
  background: ${(props) => props.$background};
  right: 0;
  bottom: 0;
  z-index: -1;
`;
