import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import routes from './routes';

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Switch>
          {routes.map((route, index) => (
            <Route exact key={index} {...route}/>
          ))}
        </Switch>
      </div>
    );
  }
}