import styled, { CSSProperties } from 'styled-components';

export const Table = styled.div<{ $width?: CSSProperties['width'] }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  width: ${(props) => props.$width || '100%'};
  background-color: ${(props) => props.theme.colors.main.background.dark};
`;

export const TableCaption = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  text-align: left;
  color: ${(props) => props.theme.colors.main.text};
  background-color: ${(props) => props.theme.colors.main.background.dark};
  border-bottom: 1px solid ${(props) => props.theme.colors.main.border};
  padding: 0.5rem;
`;

export const TableRow = styled.div<{
  $background?: CSSProperties['background'];
}>`
  display: flex;
  width: 100%;
  background-color: ${(props) => props.$background || 'transparent'};
  transition: background-color 0.3s ease-in-out;
`;

const TableCell = styled.div<{
  $align?: CSSProperties['textAlign'];
  $width?: CSSProperties['width'];
}>`
  text-align: ${(props) => props.$align || 'left'};
  width: ${(props) => props.$width || '100%'};

  &:last-child {
    padding-left: 0;
  }

  &:first-child {
    padding-right: 0;
  }
`;

export const TableHeadCell = styled(TableCell)`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: ${(props) => props.theme.colors.main.caption};
  padding: 0.5rem 0.75rem;
`;

export const TableHead = styled.div``;

export const TableBodyCell = styled(TableCell)<{
  $color?: CSSProperties['color'];
}>`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  color: ${(props) => props.$color || props.theme.colors.main.text};
  padding: 0.25rem 0.75rem;
`;

export const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  ${TableRow} {
    &:hover {
      background-color: ${(props) => props.theme.colors.main.background.light};
    }
  }
`;
