import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Login from './Login';
import CadastroDoador from './CadastroDoador';
import CadastroColetor from './CadastroColetor';
import GerenciarColetores from './GerenciarColetores';


ReactDOM.render(
(<BrowserRouter>  
    <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/cadastroDoador" component={CadastroDoador}/>
        <Route path="/cadastroColetor" component={CadastroColetor}/>
        <Route path="/gerenciarColetores" component={GerenciarColetores}/>

    </Switch>
</BrowserRouter>)
    , 

document.getElementById('root')

);

