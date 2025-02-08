import styled, { CSSProperties } from 'styled-components';

export const Table = styled.table<{ $width?: CSSProperties['width'] }>`
  width: ${(props) => props.$width || '100%'};
  background-color: ${(props) => props.theme.colors.main.background.dark};
  border-collapse: collapse;
`;

export const TableCaption = styled.caption`
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.5;
  text-align: left;
  color: ${(props) => props.theme.colors.main.text.default};
  background-color: ${(props) => props.theme.colors.main.background.dark};
  border-bottom: 1px solid ${(props) => props.theme.colors.main.border};
  padding: 0.5rem;
`;

export const TableRow = styled.tr<{
  $background?: CSSProperties['background'];
}>`
  background-color: ${(props) => props.$background || 'transparent'};
`;

export const TableHeadCell = styled.th<{
  $align?: CSSProperties['textAlign'];
  $width?: CSSProperties['width'];
}>`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  text-align: ${(props) => props.$align || 'left'};
  color: ${(props) => props.theme.colors.main.text.light};
  width: ${(props) => props.$width || '100%'};
`;

export const TableHead = styled.thead`
  ${TableHeadCell} {
    padding: 0.5rem 0.75rem;

    &:not(:first-child):not(:last-child) {
      padding-right: 0;
    }
  }
`;

export const TableBodyCell = styled.td<{
  $align?: CSSProperties['textAlign'];
  $color?: CSSProperties['color'];
}>`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
  text-align: ${(props) => props.$align || 'left'};
  color: ${(props) => props.$color || props.theme.colors.main.text.default};
`;

export const TableBody = styled.tbody`
  ${TableRow} {
    &:hover {
      background-color: ${(props) => props.theme.colors.main.background.light};
    }
  }

  ${TableBodyCell} {
    padding: 0.25rem 0.75rem;
  }
`;
