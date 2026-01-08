import '@emotion/react';
import { Theme as MuiTheme } from '@mui/material/styles';

declare module '@emotion/react' {
  export interface Theme extends MuiTheme {
    // You can extend the theme with custom properties here if needed
    // For example:
    // custom: {
    //   borderRadius: string;
    //   shadows: string[];
    // };
  }
}
