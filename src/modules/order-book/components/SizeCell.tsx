import styled, { CSSProperties } from 'styled-components';

export const SizeCell = styled.div<{
  $background: CSSProperties['background'];
}>`
  width: 100%;
  background: ${(props) => props.$background};
`;
