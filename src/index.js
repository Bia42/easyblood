import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Login from './Login';
import CadastroDoador from './CadastroDoador';

ReactDOM.render(
(<BrowserRouter>  
    <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/cadastroDoador" component={CadastroDoador}/>
    </Switch>
</BrowserRouter>)
    , 

document.getElementById('root')

);

