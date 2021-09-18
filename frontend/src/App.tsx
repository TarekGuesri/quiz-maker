import React, { FC, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from 'src/components/layout/loading';
import Theme from 'src/components/theme';

import { routes } from './routes';
import './App.css';

const App: FC = () => {
  return (
    <Theme>
      <Suspense fallback={<Loading />}>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={`route-${index}`}
              component={lazy(() => route.component)}
              path={route.path}
              exact={route.exact}
            />
          ))}
        </Switch>
      </Suspense>
    </Theme>
  );
};

export default App;
