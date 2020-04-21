import React, { Component } from 'react';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import * as utils from "./utils/utils";



class CadastroDoador extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
        selectValue: "",
        selectValueSexo: ""
        }
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownChange2 = this.handleDropdownChange2.bind(this);


	}

    
      handleDropdownChange(e) {
        this.setState({ selectValue: e.target.value });
      }
      handleDropdownChange2(e) {
        this.setState({ selectValueSexo: e.target.value });
      }
      
    envia(event){


		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("");
		
		axios.post('/rest/hemocentro/add',   {
        cpf: this.cpf.value,
        nome: this.name.value,
        senha: this.password.value,
        data_nascimento: this.bithDate.value
        })
		.then(response => {
			console.log(response);
			//localStorage.setItem('dados', response.data);
			//this.props.history.push("/")
			}).catch(error=> {
				this.setState({msg:'não foi possível fazer o login'});
			console.log(error);
            });
            
    }
    
    render(){
        return (
        
         <div> 
         <Header/>
         <div className="limiter">
             <div className="container-login100">
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                     <form className="login100-form validate-form"  onSubmit={this.envia.bind(this)}>
                         <span className="login100-form-title p-b-55">
                             Cadastro de Doador
                         </span>
     
                         <span>{this.state.msg}</span>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="nome" placeholder="Nome" ref={(input) => this.name = input }/>
                             <span className="focus-input100"></span>
                         </div>
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="cpf" placeholder="CPF" ref={(input) => this.cpf = input }/>
                             <span className="focus-input100"></span>
                         </div>
                         
                         <div className="wrap-input100 validate-input m-b-16">
                            <p>Escolha seu tipo Sanguinio:</p>
                            <select id="dropdown" onChange= {this.handleDropdownChange}>
                                <option value = "A+">A+</option>
                                <option value = "A-">A-</option>
                                <option value = "B+">B+</option>
                                <option value = "B-">B-</option>
                                <option value = "AB+">AB+</option>
                                <option value = "AB-">AB-</option>
                                <option value = "O-">O-</option>
                                <option value = "O+">O+</option>
                            </select>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16">
                            <p>Sexo:</p>
                            <select id="dropdownSexo" onChange= {this.handleDropdownChange2}>
                                <option value = "F">F</option>
                                <option value = "M">M</option>
                                <option value = "O">Outros</option>
                            </select>
                        </div>

                        <div className="wrap-input100 validate-input m-b-16">
                            <p>Data de Nascimento:</p>
                                <input type="date" ref={(input) => this.bithDate = input }/>
                        </div>
                        <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
                             <input className="input100" type="text" name="email" placeholder="Email" ref={(input) => this.username = input }/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                 <span className="lnr lnr-envelope"></span>
                             </span>
                         </div>
     
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                             <input className="input100" type="password" name="pass" placeholder="Password" ref={(input) => this.password = input }/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                 <span className="lnr lnr-lock"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                             <input className="input100" type="password" name="pass" placeholder="Confirmar Password" ref={(input) => this.passwordConfirm = input }/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                 <span className="lnr lnr-lock"></span>
                             </span>
                         </div>
     
                         
                         <div className="container-login100-form-btn p-t-25">
                             <input type="submit" className="login100-form-btn"  value = "Cadastrar"/>
                         </div>
                     </form>
                 </div>
             </div>
         </div>
         </div>  
        );
       }
}

export default CadastroDoador;
