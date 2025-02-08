import { useTheme } from 'styled-components';

import {
  Table,
  TableBody,
  TableBodyCell,
  TableCaption,
  TableHead,
  TableHeadCell,
  TableRow,
} from '@/modules/common/components/Table';
import { TotalCell } from '@/modules/order-book/components/TotalCell';
import { PriceRecord } from '@/modules/trade/types';

import { OrderBookTableData, OrderBookTableDataItem } from '../types';
import LatestPriceRow from './LatestPriceRow';
import { SizeCell } from './SizeCell';

type OrderBookTableProps = {
  asks: OrderBookTableData;
  bids: OrderBookTableData;
  priceRecord: PriceRecord;
};

function OrderBookTable({ asks, bids, priceRecord }: OrderBookTableProps) {
  const theme = useTheme();

  const getSizeCellBackground = (order: OrderBookTableDataItem): string => {
    if (!order.prevSize || order.prevSize === order.size) return 'transparent';

    if (order.size > order.prevSize) {
      return theme.colors.bid.background.dark;
    }

    return theme.colors.ask.background.dark;
  };

  return (
    <>
      <Table $width="350px">
        <TableCaption>Order Book</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeadCell $width="40%">Price (USD)</TableHeadCell>
            <TableHeadCell $width="10%" $align="right">
              Size
            </TableHeadCell>
            <TableHeadCell $width="50%" $align="right">
              Total
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asks.data.map((data, index) => (
            /** @todo: correct highlight background, only highlight when data is new */
            <TableRow
              key={data.price}
              $background={
                index === 0 ? theme.colors.ask.background.dark : undefined
              }
            >
              <TableBodyCell $color={theme.colors.ask.text}>
                {data.price}
              </TableBodyCell>
              <TableBodyCell $align="right">
                <SizeCell $background={getSizeCellBackground(data)}>
                  {data.size}
                </SizeCell>
              </TableBodyCell>
              <TableBodyCell $align="right">
                <TotalCell
                  $percentage={data.total / asks.totalSize}
                  $background={theme.colors.ask.background.light}
                >
                  {data.total}
                </TotalCell>
              </TableBodyCell>
            </TableRow>
          ))}
          <LatestPriceRow record={priceRecord} />
          {bids.data.map((data, index) => (
            /** @todo: correct highlight background, only highlight when data is new */
            <TableRow
              key={data.price}
              $background={
                index === 1 ? theme.colors.bid.background.dark : undefined
              }
            >
              <TableBodyCell $color={theme.colors.bid.text}>
                {data.price}
              </TableBodyCell>
              <TableBodyCell $align="right">
                <SizeCell $background={getSizeCellBackground(data)}>
                  {data.size}
                </SizeCell>
              </TableBodyCell>
              <TableBodyCell $align="right">
                <TotalCell
                  $percentage={data.total / bids.totalSize}
                  $background={theme.colors.bid.background.light}
                >
                  {data.total}
                </TotalCell>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default OrderBookTable;
