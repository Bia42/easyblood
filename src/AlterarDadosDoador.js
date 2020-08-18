import React, { Component } from 'react';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import * as utils from "./utils/utils";

class AlterarDadosDoador extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
            doadorBusca: {}
        };
        this.procurarCpf = this.procurarCpf.bind(this);
	}
    procurarCpf(e) {
        axios.post('/rest/doador/historico',{
            cpf:  this.cpf.value,
            })
            .then(response => {
             console.log(response.data);
             this.setState({doadorBusca: response.data});

            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e.response.status);
                console.log(e.response.data.cupom);
        });
    }
    render(){
        return (        
         <div> 
         <Header/>
         <div className="limiter">
             <div className="container-login100">
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                     <form className="login100-form validate-form">
                         <span className="login100-form-title p-b-55">
                             Histórico do Doador
                         </span>
     
                         <span className="wrap-input100 validate-input m-b-16" > Digite o CPF para Buscar</span>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "" open={this.state.modalOpen} toggle={this.toggle}>
                             <input className="input100" type="text" name="cpf" placeholder="CPF"
                                    ref={(input) => this.cpf = input }
                                    onChange={this.procurarCpf}/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-license"></span>
                             </span>                             
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="nome" placeholder="Nome"
                                    ref={(input) => this.nome = input} defaultValue={this.state.doadorBusca.nome || ""} readOnly/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-user"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="email" placeholder="Email" defaultValue={this.state.doadorBusca.email || ""} readOnly/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                  <span className="lnr lnr-envelope"></span>
                              </span>
                         </div>               

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="tipoSanguineo" placeholder="Tipo Sanguíneo" defaultValue={this.state.doadorBusca.tipoSanguineo || ""} readOnly/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-drop"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <textarea className="input100" type="text" name="historico" placeholder="Histórico" id="exampleFormControlTextarea1" defaultValue={this.state.doadorBusca.historico || ""} rows="3" readOnly/>
                             <span className="symbol-input100">
                                <span className="lnr lnr-menu"></span>
                             </span>
                             <span className="focus-input100"></span>                             
                         </div>
                     </form>
                 </div>
             </div>
         </div>
         </div>  
        );
       }
}

export default AlterarDadosDoador;
