// Type definitions for modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// For page components
declare module 'pages/*' {
  import { ComponentType } from 'react';
  const Component: ComponentType<unknown>;
  export default Component;
}

// Fix for @emotion/react theme type
declare module '@emotion/react' {
  import { Theme as MuiTheme } from '@mui/material/styles';
  export interface Theme extends MuiTheme {}
}
