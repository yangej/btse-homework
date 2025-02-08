import styled, { CSSProperties, useTheme } from 'styled-components';

import { numberFormatter } from '@/modules/common/formatters';

import { OrderBookTableDataItem } from '../types';

type SizeCellProps = {
  order: OrderBookTableDataItem;
};

export const SizeCell = ({ order }: SizeCellProps) => {
  const theme = useTheme();

  const getBackgroundColor = (order: OrderBookTableDataItem): string => {
    if (!order.prevSize || order.prevSize === order.size) return 'transparent';

    if (order.size > order.prevSize) {
      return theme.colors.bid.background.dark;
    }

    return theme.colors.ask.background.dark;
  };

  return (
    <Wrapper $background={getBackgroundColor(order)}>
      {numberFormatter.format(order.size)}
    </Wrapper>
  );
};

const Wrapper = styled.div<{
  $background: CSSProperties['background'];
}>`
  width: 100%;
  background: ${(props) => props.$background};
`;
