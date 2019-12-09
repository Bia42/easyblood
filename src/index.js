import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './App';
import Login from './Login';
import CadastroDoador from './CadastroDoador';
import CadastroColetor from './CadastroColetor';
import GerenciarColetores from './GerenciarColetores';
import AlterarDadosDoador from './AlterarDadosDoador';
import ComunicacaoHemocentro from './ComunicacaoHemocentro';
import CadastroRequisitos from './CadastroRequisitos';
import VerificarNiveis from './VerificarNiveis';




ReactDOM.render(
(<BrowserRouter>  
    <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/cadastroDoador" component={CadastroDoador}/>
        <Route path="/cadastroColetor" component={CadastroColetor}/>
        <Route path="/gerenciarColetores" component={GerenciarColetores}/>
        <Route path="/alterarDadosDoador" component={AlterarDadosDoador}/>
        <Route path="/comunicacaoHemocentros" component={ComunicacaoHemocentro}/>
        <Route path="/cadastroRequisitos" component={CadastroRequisitos}/>
        <Route path="/verificarNiveis" component={VerificarNiveis}/>


        


    </Switch>
</BrowserRouter>)
    , 

document.getElementById('root')

);

