import React, { FC, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from 'src/components/layout/loading';

import { routes } from './routes';
import './App.css';

const App: FC = () => {
  return (
    <div className="App">
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
    </div>
  );
};

export default App;
