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
    <Wrapper
      $percentage={order.total / totalSize}
      $background={theme.colors.ask.background.light}
    >
      {numberFormatter.format(order.total)}
    </Wrapper>
  );
};

export const BidTotalCell = ({ order, totalSize }: TotalCellProps) => {
  const theme = useTheme();

  return (
    <Wrapper
      $percentage={order.total / totalSize}
      $background={theme.colors.bid.background.light}
    >
      {numberFormatter.format(order.total)}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  $percentage: number;
  $background: CSSProperties['background'];
}>`
  position: relative;
  width: 100%;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    height: 100%;
    width: ${(props) => `${props.$percentage * 100}%`};
    background: ${(props) => props.$background};
  }
`;
