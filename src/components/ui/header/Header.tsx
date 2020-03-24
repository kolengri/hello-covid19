import * as React from 'react';

import { Logo } from '../logo';
import { Outer } from './styled';

export type HeadersProps = {};

const HeadersMemo: React.FC<HeadersProps> = (props) => {
  return (
    <Outer>
      <Logo />
    </Outer>
  );
};

export const Headers = React.memo(HeadersMemo);

export default Headers;
