import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom'
import Chat from './chat';
import Login from './login'


class Main extends Component {
  render() {
    return (
      <Switch>
        <Route  exact path="/" component={Login}/>
        <Route exact path="/chat" component={Chat}/>
      </Switch>
    );
  }
}

export default Main;
