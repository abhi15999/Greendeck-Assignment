import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import Frontpage from './components/frontPage';

export default class App extends Component {
  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/'>
            <Frontpage/>
          </Route>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    )
  }
}
