/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import App from './App';
import Register from './pages/register';
import Painel from './pages/painel';
import Students from './pages/students';
import Aulas from './pages/aulas';
import Training from './pages/training';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/register" component={Register} />
      <Route path="/painel" component={Painel} />
      <Route path="/students" component={Students} />
      <Route path="/aulas" component={Aulas} />
      <Route path="/training" component={Training} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('app'),
);
