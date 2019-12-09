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
              <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
                  <a className="header-logo pure-menu-heading" href="">Easy Blood</a>
                  <ul className="pure-menu-list">
                      <li className="pure-menu-item pure-menu-selected"><Link to="/" className="pure-menu-link">Home</Link></li>

                      {
                          utils.novoRequestInfo("") == null ?
                              (
                                  <li className="pure-menu-item"><Link to="/login" className="pure-menu-link">Login</Link></li>
                              ) :
                              (
                                  <React.Fragment>
                                  {/*<li className="pure-menu-item"><Link to="/cadastroDoador" className="pure-menu-link">Cadastro de doador</Link></li>*/}
                                  <li className="pure-menu-item"><Link to="/verificarNiveis" className="pure-menu-link">Verificar Niveis</Link></li>
                                  <li className="pure-menu-item"><Link to="/comunicacaoHemocentros" className="pure-menu-link">Comunicação entre Hemocentros</Link></li>
                                  <li className="pure-menu-item"><Link to="/alterarDadosDoador" className="pure-menu-link">Alterar dados do Doador</Link></li>
                                  <li className="pure-menu-item"><Link to="/gerenciarColetores" className="pure-menu-link">Gerenciar coletores</Link></li>
                                  <li className="pure-menu-item"><Link to="/cadastroRequisitos" className="pure-menu-link">Cadastro de Requisitos</Link></li>
                                  <li className="pure-menu-item"><Link to="/" className="pure-menu-link" onClick={utils.logout}>Logout</Link></li>
                                  </React.Fragment>
                              )
                      }


                      {/*<li className="pure-menu-item"><Link to="/ajuda" className="pure-menu-link">Ajuda</Link></li>*/}

                  </ul>
              </div>
          </div>
        ;

        return header;
    }
}