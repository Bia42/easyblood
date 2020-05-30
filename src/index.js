import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './css/bootstrap.min.css'
import './css/agency.min.css'

import Login from './Login';
import CadastroDoador from './CadastroDoador';
import CadastroPatrocinador from './CadastroPatrocinador';
import CadastroColetor from './CadastroColetor';
import GerenciarColetores from './GerenciarColetores';
import AlterarDadosDoador from './AlterarDadosDoador';
import ComunicacaoHemocentro from './ComunicacaoHemocentro';
import CadastroRequisitos from './CadastroRequisitos';
import VerificarNiveis from './VerificarNiveis';
import GerarCupons from './GerarCupons';

ReactDOM.render(/*<App />*/
    (<BrowserRouter>  
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/cadastroPatrocinador" component={CadastroPatrocinador}/>
            <Route path="/gerarCupons" component={GerarCupons}/>
            <Route path="/cadastroDoador" component={CadastroDoador}/>
            <Route path="/cadastroColetor" component={CadastroColetor}/>
            <Route path="/gerenciarColetores" component={GerenciarColetores}/>
            <Route path="/alterarDadosDoador" component={AlterarDadosDoador}/>
            <Route path="/comunicacaoHemocentros" component={ComunicacaoHemocentro}/>
            <Route path="/cadastroRequisitos" component={CadastroRequisitos}/>
            <Route path="/verificarNiveis" component={VerificarNiveis}/>            
        </Switch>
    </BrowserRouter>)
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();