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
        this.handleDropdownChange2 = this.handleDropdownChange2.bind(this);
    }
    handleDropdownChange(e) {
        this.setState({ selectDia: e.target.value });
      }
    handleDropdownChange2(e) {
        this.setState({ selectDiaFinal: e.target.value });
      }
    envia(event){

		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("")

        console.log({
            hemocentro_id: utils.getCookie(),
            periodo_inicio: this.periodo_inicio.value,
            periodo_final: this.periodo_final.value,
            dia: this.state.selectDia,
            diaFinal: this.state.selectDiaFinal,
            quantidade: this.quantidade.value,
            tempo: this.tempo.value,
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

                        <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <p>Período Inicial</p>
                             <input className="input100" type="month" name="perio" maxLength="5" placeholder="Período Inicial" ref={(input) => this.periodo_inicio = input }/>
                             <span className="focus-input100"/>
                         
                        </div>

                        <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <p>Período Final</p>
                             <input className="input100" type="month" name="periofo" maxLength="5" placeholder="Período Final" ref={(input) => this.periodo_final = input }/>
                             <span className="focus-input100"/>
                        </div>

                        <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                         <Form.Label>Selecione o dia inicial</Form.Label>
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

                       <Form.Group controlId="exampleForm.SelectCustomSizeSm">
                         <Form.Label>Selecione o dia final</Form.Label>
                         <Form.Control as="select" size="sm" custom onChange={this.handleDropdownChange2}>
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
                            <p>Quantidade de doadores por atendimento:</p>
                             <input className="input100" type="number" name="quantidade" maxLength="5" placeholder="Quantidade" ref={(input) => this.quantidade = input }/>
                             <span className="focus-input100"/>
                        </div>

                        <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <p>Tempo de doação em minutos:</p>
                             <input className="input100" type="number" name="tempo" maxLength="5" placeholder="Tempo em minutos" ref={(input) => this.tempo = input }/>
                             <span className="focus-input100"/>
                        </div>

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
