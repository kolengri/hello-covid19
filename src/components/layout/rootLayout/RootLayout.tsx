import * as React from 'react';

import { Container, Headers } from '../../ui';

export type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayoutMemo: React.FC<RootLayoutProps> = (props) => {
  const { children } = props;
  return (
    <>
      <Container>
        <Headers />
      </Container>
      {children}
    </>
  );
};

export const RootLayout = React.memo(RootLayoutMemo);

export default RootLayout;
