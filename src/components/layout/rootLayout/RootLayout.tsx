import * as React from 'react';

import { Container, Footer, Headers } from '../../ui';
import { Main, Outer } from './styled';

export type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayoutMemo: React.FC<RootLayoutProps> = (props) => {
  const { children } = props;
  return (
    <Outer>
      <Container>
        <Headers />
      </Container>
      <Main>{children}</Main>
      <Footer />
    </Outer>
  );
};

export const RootLayout = React.memo(RootLayoutMemo);

export default RootLayout;
