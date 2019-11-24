import React, {Component} from 'react';
import '../css/pure-min.css';
import {
    Link,
  } from 'react-router-dom';
import '../css/marketing.css';


export default class Header extends Component{

    render(){
        return(
        <div className="header">
              <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed">
                  <a className="header-logo pure-menu-heading" href="">Easy Blood</a>
                  <ul className="pure-menu-list">
                      <li className="pure-menu-item pure-menu-selected"><Link to="/" className="pure-menu-link">Home</Link></li>
                      <li className="pure-menu-item"><Link to="/cadastroDoador" className="pure-menu-link">Cadastro de doador</Link></li>
                      <li className="pure-menu-item"><Link to="/cadastroColetor" className="pure-menu-link">Cadastro de coletor</Link></li>
                      <li className="pure-menu-item"><Link to="/ajuda" className="pure-menu-link">Ajuda</Link></li>
                      <li className="pure-menu-item"><Link to="/login" className="pure-menu-link">Sign Up</Link></li>
                  </ul>
              </div>
          </div>
        );
    }
}