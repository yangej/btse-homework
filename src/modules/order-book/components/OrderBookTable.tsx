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
import { numberFormatter } from '@/modules/common/formatters';
import {
  AskTotalCell,
  BidTotalCell,
} from '@/modules/order-book/components/TotalCell';
import { PriceRecord } from '@/modules/trade/types';

import { useNewOrderSet } from '../hooks/useNewOrderSet';
import { OrderBookTableData } from '../types';
import LatestPriceRow from './LatestPriceRow';
import { SizeCell } from './SizeCell';

type OrderBookTableProps = {
  asks: OrderBookTableData;
  bids: OrderBookTableData;
  priceRecord: PriceRecord;
};

function OrderBookTable({ asks, bids, priceRecord }: OrderBookTableProps) {
  const theme = useTheme();

  const newAskPrices = useNewOrderSet(asks.data);
  const newBidPrices = useNewOrderSet(bids.data);

  return (
    <>
      <Table $width="350px">
        <TableCaption>Order Book</TableCaption>
        <TableHead>
          <TableRow>
            <TableHeadCell $width="30%">Price (USD)</TableHeadCell>
            <TableHeadCell $width="30%" $align="right">
              Size
            </TableHeadCell>
            <TableHeadCell $width="40%" $align="right">
              Total
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asks.data.map((data) => (
            <TableRow
              key={`${data.price}-${data.size}`}
              $background={
                newAskPrices.has(data.price)
                  ? theme.colors.ask.background.dark
                  : undefined
              }
            >
              <TableBodyCell $width="30%" $color={theme.colors.ask.text}>
                {numberFormatter.format(data.price)}
              </TableBodyCell>
              <TableBodyCell $width="30%" $align="right">
                <SizeCell order={data} />
              </TableBodyCell>
              <TableBodyCell $width="40%" $align="right">
                <AskTotalCell order={data} totalSize={asks.totalSize} />
              </TableBodyCell>
            </TableRow>
          ))}
          <LatestPriceRow record={priceRecord} />
          {bids.data.map((data) => (
            <TableRow
              key={`${data.price}-${data.size}`}
              $background={
                newBidPrices.has(data.price)
                  ? theme.colors.bid.background.dark
                  : undefined
              }
            >
              <TableBodyCell $width="30%" $color={theme.colors.bid.text}>
                {numberFormatter.format(data.price)}
              </TableBodyCell>
              <TableBodyCell $width="30%" $align="right">
                <SizeCell order={data} />
              </TableBodyCell>
              <TableBodyCell $width="40%" $align="right">
                <BidTotalCell order={data} totalSize={bids.totalSize} />
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default OrderBookTable;
