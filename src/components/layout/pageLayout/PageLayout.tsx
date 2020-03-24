import * as React from 'react';

import { H1 } from '@blueprintjs/core';
import { Helmet } from 'react-helmet';

import { Container } from '../../ui';

export type PageLayoutProps = {
  children: React.ReactNode;
  title: string;
  header?: string;
};

const PageLayoutMemo: React.FC<PageLayoutProps> = (props) => {
  const { children, title, header } = props;
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <Container>
        {header && <H1>{header}</H1>}
        <main>{children}</main>
      </Container>
    </>
  );
};

export const PageLayout = React.memo(PageLayoutMemo);

export default PageLayout;
