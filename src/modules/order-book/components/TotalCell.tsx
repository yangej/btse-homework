import styled, { CSSProperties } from 'styled-components';

export const TotalCell = styled.div<{
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
