import React, {Component} from 'react';
// import logo from './logo.svg';
import {CardList} from './componentes/patrocinadores-list.component.jsx'
import './App.css';
import Header from './componentes/Header';
import * as utils from "./utils/utils";

class App extends Component {
  constructor(){
      super();

      this.state = {
        patrocinadores:[]
      };
  }
  
  componentDidMount(){
      fetch(utils.URL_BASE + '/rest/patrocinador/listPatrocinadores')
      .then (response => response.json())
      .then (users => this.setState({patrocinadores: users}));
    }

render() {  
  return ( 
  <div className="App">
  <Header/>
    <header className="masthead">
      <div className="container">
        <div className="intro-text">
          <img src="../logo_simb.fw.png" className="logo_simb"/>
          <div className="intro-lead-in">Bem Vindo ao DoeMais!</div>
          <div className="intro-heading text-uppercase">Venha fazer a diferença</div>
          <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" href="#services">Serviços do Projeto</a>
        </div>
      </div>
    </header>
    <section className="page-section" id="services">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">Serviços</h2>
            <h3 className="section-subheading text-muted">Aqui estão nossos serviços.</h3>
          </div>
        </div>
        <div className="row text-center">
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-calendar fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">Agenda</h4>
            <p className="text-muted">Tenha o controle de sua agenda, verifique os atendimentos marcados e disponibilize horários para atendimento.</p>
          </div>
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-ticket fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">Cupons</h4>
            <p className="text-muted">Gere cupons e disponibilize para uso de doadores, assim contribuindo com a fidelização com o hemocentro.</p>
          </div>
          <div className="col-md-4">
            <span className="fa-stack fa-4x">
              <i className="fa fa-circle fa-stack-2x text-primary"></i>
              <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
            </span>
            <h4 className="service-heading">Campanhas</h4>
            <p className="text-muted">Cadastre campanhas de doação de sangue de uma forma fácil, alcançando mais pessoas e contribuindo com o estoque de sangue em períodos críticos.</p>
          </div>
        </div>
      </div>
    </section>

    <CardList patrocinadores={this.state.patrocinadores}/>
    
    <section className="page-section" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">Sobre</h2>
            <h3 className="section-subheading text-muted">Um pouco da história do projeto DoeMais.</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ul className="timeline">
              <li>
                <div className="timeline-image">
                  <img className="rounded-circle img-fluid" src="img/about/1.jpg" alt=""/>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>2020</h4>
                    <h4 className="subheading">O início</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">Para o projeto de conclusão de curso, nossa equipe precisava de um tema para desenvolver durante o ano. Após algumas pesquisas notamos o grande desafio que o Brasil enfrenta com doação de sangue.</p>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-image">
                  <img className="rounded-circle img-fluid" src="img/about/2.jpg" alt=""/>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>Fevereiro 2020</h4>
                    <h4 className="subheading">O projeto</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">Com isto, decidimos criar o projeto DoeMais com o propósito de contrubuir com hemocentros e atrair cada vez mais doadores!</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="timeline-image">
                  <img className="rounded-circle img-fluid" src="img/about/3.jpg" alt=""/>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>Abril 2020</h4>
                    <h4 className="subheading">Primeiras telas e Desafios</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">O projeto começou a evoluir e com a ajuda de nosso mentor Orandi, o sistema tem sua primeira inteface para cadastros. Porém desafios começaram a aparecer, erros e conceitos passaram a ser dicutidos e com o tempo solucionados!</p>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-image">
                  <img className="rounded-circle img-fluid" src="img/about/4.jpg" alt=""/>
                </div>
                <div className="timeline-panel">
                  <div className="timeline-heading">
                    <h4>Maio 2020</h4>
                    <h4 className="subheading">Entrega da primeira versão</h4>
                  </div>
                  <div className="timeline-body">
                    <p className="text-muted">Com o esforço da equipe, entregamos a primeira versão do Projeto DoeMais. Web focando em funcionalidades básicas em atender os Hemocentros e o Mobile com funcionalidades básicas buscando atender os doadores!</p>
                  </div>
                </div>
              </li>
              <li className="timeline-inverted">
                <div className="timeline-image">
                  <h4>Faça parte
                    <br/>da nossa
                    <br/>História!</h4>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-light page-section" id="team">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2 className="section-heading text-uppercase">Nossa Equipe</h2>
            <h3 className="section-subheading text-muted">Agradecemos ao mentor Orandi.</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <div className="team-member">
              <img src="../1.jpeg" className="mx-auto rounded-circle"/>
              <h4>Jansley Barbosa</h4>
              <p className="text-muted">Desenvolvedor Mobile</p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="team-member">
              <img className="mx-auto rounded-circle" src="../2.jpg" alt=""/>
              <h4>Lucas Oliveira</h4>
              <p className="text-muted">Desenvolvedor Web</p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="team-member">
              <img className="mx-auto rounded-circle" src="../4.jpeg" alt=""/>
              <h4>Beatriz Oliveira</h4>
              <p className="text-muted">Desenvolvedor Web</p>
              <ul className="list-inline social-buttons">
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-twitter"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-facebook-f"></i>
                  </a>
                </li>
                <li className="list-inline-item">
                  <a href="#something">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div><div className="col-sm-4">
          <div className="team-member">
            <img className="mx-auto rounded-circle" src="../3.jpeg" alt=""/>
            <h4>Marcus Pinheiro</h4>
            <p className="text-muted">Desenvolvedor Mobile</p>
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>        
        </div>
        <div className="row">
          <div className="col-lg-8 mx-auto text-center">
            <p className="large text-muted">Buscamos fazer a diferença.</p>
          </div>
        </div>
      </div>
    </section>
    <section className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-6">
            <a href="#something">
              <img className="img-fluid d-block mx-auto" src="img/logos/envato.jpg" alt=""/>
            </a>
          </div>
          <div className="col-md-3 col-sm-6">
            <a href="#something">
              <img className="img-fluid d-block mx-auto" src="img/logos/designmodo.jpg" alt=""/>
            </a>
          </div>
          <div className="col-md-3 col-sm-6">
            <a href="#something">
              <img className="img-fluid d-block mx-auto" src="img/logos/themeforest.jpg" alt=""/>
            </a>
          </div>
          <div className="col-md-3 col-sm-6">
            <a href="#something">
              <img className="img-fluid d-block mx-auto" src="img/logos/creative-market.jpg" alt=""/>
            </a>
          </div>
        </div>
      </div>
    </section>
    <footer className="footer">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <span className="copyright">Copyright &copy; DoeMais 2020</span>
          </div>
          <div className="col-md-4">
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#something">
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="list-inline quicklinks">
              <li className="list-inline-item">
                <a href="#something">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#something">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
  );
}
}

export default App;