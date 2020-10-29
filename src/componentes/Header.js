import React, {Component} from 'react';
import '../css/pure-min.css';
import {
    Link,
  } from 'react-router-dom';
import '../css/marketing.css';
import * as utils from "../utils/utils";


export default class Header extends Component{

    render(){

        var header =
        <div className="header">
            <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
                <div className="container">
                <a className="navbar-brand js-scroll-trigger" href="/">DoeMais</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fa fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav text-uppercase ml-auto">                       
                        {
                            utils.novoRequestInfo("") == null ?
                                (   
                                    <li className="pure-menu-item"><Link to="/login" className="pure-menu-link">Entrar</Link></li>
                                ) :
                                (
                                    utils.usuarioLogado() != null ?
                                    (
                                        <React.Fragment>
                                    {/*<li className="pure-menu-item"><Link to="/cadastroDoador" className="pure-menu-link">Cadastro de doador</Link></li>*/}
                                   {/*  <li className="pure-menu-item"><Link to="/verificarNiveis" className="pure-menu-link">Verificar Niveis</Link></li>
                                    <li className="pure-menu-item"><Link to="/comunicacaoHemocentros" className="pure-menu-link">Comunicação entre Hemocentros</Link></li>
                                    <li className="pure-menu-item"><Link to="/gerenciarColetores" className="pure-menu-link">Gerenciar coletores</Link></li>*/}
                                    <li className="pure-menu-item"><Link to="/cadastrarCampanhas" className="pure-menu-link">Campanhas</Link></li>    
                                    <li className="pure-menu-item"><Link to="/listarCupons" className="pure-menu-link">Listar Cupons</Link></li> 
                                    <li className="pure-menu-item"><Link to="/gerarCupons" className="pure-menu-link">Gerar Cupons</Link></li> 
                                    <li className="pure-menu-item"><Link to="/" className="pure-menu-link" onClick={utils.logout}>Logout</Link></li>
                                    </React.Fragment>
                                    ):
                                    (   
                                        <React.Fragment>
                                        <li className="pure-menu-item"><Link to="/confirmarCheckIn" className="pure-menu-link">Confirmar Check-In</Link></li>                                                                               
                                        <li className="pure-menu-item"><Link to="/divulgarCampanhas" className="pure-menu-link">Divulgar Campanhas</Link></li>                                        
                                        <li className="pure-menu-item"><Link to="/atendimentoHemocentro" className="pure-menu-link">Horário Atendimento</Link></li>
                                        <li className="pure-menu-item"><Link to="/agenda" className="pure-menu-link">Agenda</Link></li>
                                        <li className="pure-menu-item"><Link to="/alterarDadosDoador" className="pure-menu-link">Histórico do Doador</Link></li>
                                        <li className="pure-menu-item"><Link to="/" className="pure-menu-link" onClick={utils.logout}>Sair</Link></li>
                                        </React.Fragment>
                                    )
                                )
                        }
                    </ul>
                </div>
                </div>
            </nav>
        </div>
        ;

        return header;
    }
}