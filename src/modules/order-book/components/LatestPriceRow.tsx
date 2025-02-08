import styled, { CSSProperties, useTheme } from 'styled-components';

import ArrowIcon from '@/modules/common/components/ArrowIcon';
import { TableBodyCell } from '@/modules/common/components/Table';
import { PriceRecord } from '@/modules/trade/types';

const LatestPriceRow = ({ record }: { record: PriceRecord }) => {
  const theme = useTheme();

  const getThemeKey = (): keyof typeof theme.colors => {
    if (record.current === record.previous) return 'main';

    if (record.current > record.previous) {
      return 'ask';
    }

    return 'bid';
  };

  return (
    <Row $backgroundColor={theme.colors[getThemeKey()].background.light}>
      <Cell $color={theme.colors[getThemeKey()].text}>
        <PriceWrapper>
          <Text>{record.current}</Text>
          {record.current === record.previous ? null : (
            <IconWrapper
              $direction={record.current > record.previous ? 'up' : 'down'}
            >
              <ArrowIcon />
            </IconWrapper>
          )}
        </PriceWrapper>
      </Cell>
    </Row>
  );
};

const Row = styled.div<{ $backgroundColor: CSSProperties['backgroundColor'] }>`
  width: 100%;
  padding: 0.125rem;
  background-color: ${(props) => props.$backgroundColor};
`;

const Cell = styled(TableBodyCell)`
  text-align: center;
`;

const Text = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.5;
`;

const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const IconWrapper = styled.div<{ $direction: 'up' | 'down' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(
    ${(props) => (props.$direction === 'up' ? '180deg' : '0deg')}
  );
`;

export default LatestPriceRow;
