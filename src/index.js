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
import VerificarNiveis from './VerificarNiveis';
import GerarCupons from './GerarCupons';
import ListarCupons from './ListarCupons';
import AtendimentoHemocentro from './AtendimentoHemocentro';
import Agenda from './agenda/main.jsx';
import CadastrarCampanhas from './CadastrarCampanhas';
import DivulgarCampanhas from './DivulgarCampanhas';
import CheckIn from './CheckIn';
import Relatorio from './GerarRelatorio';




ReactDOM.render(/*<App />*/
    (<BrowserRouter>  
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/cadastroPatrocinador" component={CadastroPatrocinador}/>
            <Route path="/gerarCupons" component={GerarCupons}/>
            <Route path="/cadastroDoador" component={CadastroDoador}/>
            <Route path="/cadastroColetor" component={CadastroColetor}/>
            <Route path="/alterarDadosDoador" component={AlterarDadosDoador}/>
            <Route path="/verificarNiveis" component={VerificarNiveis}/>     
            <Route path="/listarCupons" component={ListarCupons}/>    
            <Route path="/atendimentoHemocentro" component={AtendimentoHemocentro}/>   
            <Route path="/agenda" component={Agenda}/>
            <Route path="/cadastrarCampanhas" component={CadastrarCampanhas}/>
            <Route path="/divulgarCampanhas" component={DivulgarCampanhas}/>
            <Route path="/confirmarCheckIn" component={CheckIn}/>
            <Route path="/gerarRelatorio" component={Relatorio}/>

        </Switch>
    </BrowserRouter>)
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();