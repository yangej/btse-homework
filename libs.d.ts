import { theme } from '@/theme/index';

type ThemeInterface = typeof theme;
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends ThemeInterface {}
}