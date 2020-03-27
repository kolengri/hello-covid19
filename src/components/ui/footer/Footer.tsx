import * as React from 'react';

import { Outer } from './styled';

export type FooterProps = {};
const FooterMemo: React.FC<FooterProps> = (props) => {
  return (
    <Outer>
      <a href="https://www.linkedin.com/in/kolengri/" rel="noopener noreferrer" target="_blank">
        Kolengri
      </a>
      {' | '}
      <a href="https://www.linkedin.com/in/alex-alexeev-ma-62550a1b/" rel="noopener noreferrer" target="_blank">
        Alexedev
      </a>
    </Outer>
  );
};

export const Footer = React.memo(FooterMemo);

export default Footer;
