import React, { Component } from 'react';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import Header from './componentes/Header';
import Form from 'react-bootstrap/Form';
import * as utils from "./utils/utils";
import axios from 'axios';

class AtendimentoHemocentro extends Component {
    constructor(props){
        super(props)
        this.state = {msg:''
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
    handleDropdownChange(e) {
        this.setState({ selectDia: e.target.value });
      }
    envia(event){

		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("")

        console.log({
            hemocentro_id: localStorage.getItem("Dados"),
            dia: this.state.selectDia,
            hora_inicio: this.hora_inicio.value,
            hora_final: this.hora_final.value
            });            
    }
    render(){
        return (        
         <div> 
         <Header/>
         <div className="limiter">
             <div className="container-login100">
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                     <form className="login100-form validate-form" onSubmit={this.envia.bind(this)}>
                         <span className="login100-form-title p-b-55">
                             Horário Atendimento
                         </span>

                         <span>{this.state.msg}</span>

                         <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                         <Form.Label>Selecione o dia disponível</Form.Label>
                         <Form.Control as="select" size="sm" custom onChange={this.handleDropdownChange}>
                           <option value = "1">Domingo</option>
                           <option value = "2">Segunda</option>
                           <option value = "3">Terça</option>
                           <option value = "4">Quarta</option>
                           <option value = "5">Quinta</option>
                           <option value = "6">Sexta</option>
                           <option value = "7">Sábado</option>
                         </Form.Control>
                       </Form.Group>

                       <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <p>Horário de Entrada:</p>
                             <input className="input100" type="time" name="inicial" maxLength="5" placeholder="Hora Inicial" ref={(input) => this.hora_inicio = input }/>
                             <span className="focus-input100"/>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                         <p>Horário de Saída:</p>
                             <input className="input100" type="time" name="final" maxLength="5" placeholder="Hora Final" ref={(input) => this.hora_final = input }/>
                             <span className="focus-input100"/>
                         </div>

                         <div className="container-login100-form-btn p-t-25">
                             <input type="submit" className="login100-form-btn"  value="Cadastrar"/>
                         </div>

                     </form>
                 </div>
             </div>
         </div>
         </div>  
        );
    }
}

export default AtendimentoHemocentro;
