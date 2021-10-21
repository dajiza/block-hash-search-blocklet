import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';

import './app.css';
import Home from './pages/home';
import Transaction from './pages/transaction';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/transaction" component={Transaction} />
        <Route path="/home" component={Home} />
      </Switch>
    </div>
  );
}

const WrappedApp = withRouter(App);

export default () => {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <WrappedApp />
    </Router>
  );
};
