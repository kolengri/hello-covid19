import * as React from 'react';

import { Link } from 'react-router-dom';

import { Home } from '../../../pages/home';
import { Logo } from '../logo';
import { Outer } from './styled';

export type HeadersProps = {};

const HeadersMemo: React.FC<HeadersProps> = (props) => {
  return (
    <Outer>
      <Link to={Home.url()}>
        <Logo />
      </Link>
    </Outer>
  );
};

export const Headers = React.memo(HeadersMemo);

export default Headers;
