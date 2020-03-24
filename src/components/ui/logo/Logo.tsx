import * as React from 'react';

import { Outer } from './styled';

export type LogoProps = {};

const LogoMemo: React.FC<LogoProps> = (props) => {
  return (
    <Outer>
      Hello
      <br />
      COVID19!
    </Outer>
  );
};

export const Logo = React.memo(LogoMemo);
