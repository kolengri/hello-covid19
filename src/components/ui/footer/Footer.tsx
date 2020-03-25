import * as React from 'react';

import { Outer } from './styled';

export type FooterProps = {};
const FooterMemo: React.FC<FooterProps> = (props) => {
  return (
    <Outer>
      <a href="https://www.linkedin.com/in/kolengri/" target="_blank">
        Kolengri
      </a>
    </Outer>
  );
};

export const Footer = React.memo(FooterMemo);

export default Footer;
