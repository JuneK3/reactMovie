import React from 'react';
import Header from './Header';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from 'routes/Home';
import TV from 'routes/TV';
import Search from 'routes/Search';
import Detail from 'routes/Detail';

export default () => (
  <Router>
    <>
      <Header />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/tv' component={TV} />
        <Route path='/search' component={Search} />
        <Route path='/movie/:id' component={Detail} />
        <Route path='/show/:id' component={Detail} />
        <Redirect from='*' to='/' />
      </Switch>
    </>
  </Router>
);
