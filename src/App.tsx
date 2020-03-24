import React from 'react';

import { Redirect, Route, Switch } from 'react-router-dom';

import { RootLayout } from './components';
import * as pages from './pages';

export type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <RootLayout>
      <Switch>
        {Object.values(pages).map((i, k) => (
          <Route exact={true} path={i.url()} component={i.component} key={k} />
        ))}
        <Redirect from="*" to={pages.Home.url()} />
      </Switch>
    </RootLayout>
  );
};

export default App;
