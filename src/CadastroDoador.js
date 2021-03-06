import React, { Component } from 'react';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import * as utils from "./utils/utils";
import { cpfMask } from "./utils/mask";
import format from 'date-fns/format'

class CadastroDoador extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
        selectValue: "",
        selectValueSexo: "",
        selectValueFuncao: "",
        usersHemocentros: [],
        selectValueUsersHemocentros:"",
        selectCPF:""
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownChange2 = this.handleDropdownChange2.bind(this);
        this.handleDropdownChange3 = this.handleDropdownChange3.bind(this);
        this.handleDropdownChange4 = this.handleDropdownChange4.bind(this);
        this.handleDropdownChange5 = this.handleDropdownChange5.bind(this);

    }
    
    componentDidMount(){
        fetch(utils.URL_BASE + '/rest/hemocentro/listHemocentros')
        .then (response => response.json())
        .then (listHemocentros => this.setState({usersHemocentros: listHemocentros}));
      }

      handleDropdownChange(e) {
        this.setState({ selectValue: e.target.value });
      }
      handleDropdownChange2(e) {
        this.setState({ selectValueSexo: e.target.value });
      }
      handleDropdownChange3(e) {
        this.setState({ selectValueFuncao: e.target.value });
      }
      handleDropdownChange4(e) {
        this.setState({ selectValueUsersHemocentros: e.target.value });
      }
      handleDropdownChange5(e) {
        this.setState({ selectCPF: cpfMask(e.target.value) });
      }
      
    envia(event){

		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("")

        const validaCPF = utils.validaCPF(this.cpf.value);
        if(validaCPF === false){
            this.setState({msg:"CPF Inválido!"});
            window.scrollTo(0, 0);
            return false;
        }

        if(this.state.selectValueUsersHemocentros !== null)    
            var hemocentro_id = parseInt(this.state.selectValueUsersHemocentros, 10);

        if(this.bithDate.value !== null)
            var data_nascimento = new Date(this.bithDate.value).toJSON();

        console.log({
            cpf: this.cpf.value,
            nome: this.name.value,
            senha: this.password.value,
            email: this.email.value,
            telefone: this.telefone.value,
            estado: this.estado.value,
            cidade: this.cidade.value,
            endereco: this.endereco.value,
            numero: this.numero.value,
            cep: this.cep.value,
            complemento: this.complemento.value,
            sexo: this.state.selectValueSexo,
            funcao: this.state.selectValueFuncao,
            dataNascimento: data_nascimento,
            hemocentroId: hemocentro_id
            });
		
		axios.post(utils.URL_BASE + '/rest/hemocentro/add',   {
        cpf: this.cpf.value,
        nome: this.name.value,
        senha: this.password.value,
        email: this.email.value,
        telefone: this.telefone.value,
        estado: this.estado.value,
        cidade: this.cidade.value,
        endereco: this.endereco.value,
        numero: this.numero.value,
        cep: this.cep.value,
        complemento: this.complemento.value,
        sexo: this.state.selectValueSexo,
        funcao: this.state.selectValueFuncao,
        dataNascimento: data_nascimento,
        hemocentroId: hemocentro_id
        })
		.then(response => {
            console.log(response);
            window.location = "/login";
			//localStorage.setItem('dados', response.data);
			//this.props.history.push("/")
			}).catch(error=> {
				this.setState({msg: error.response.data});
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
                             Cadastro de Usuário
                         </span>                         
                             
                         <span>{this.state.msg}</span>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="nome" placeholder="Nome" ref={(input) => this.name = input } required/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-user"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="cpf" maxLength="14" placeholder="CPF" onChange={this.handleDropdownChange5} ref={(input) => this.cpf = input } required/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-license"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
                              <input className="input100" type="text" name="email" placeholder="Email" ref={(input) => this.email = input } required/>
                              <span className="focus-input100"></span>
                              <span className="symbol-input100">
                                  <span className="lnr lnr-envelope"></span>
                              </span>
                          </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="telefone" maxLength="14" placeholder="Telefone" ref={(input) => this.telefone = input }/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-phone-handset"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="cep" maxLength="20" placeholder="CEP" ref={(input) => this.cep = input }/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-pushpin"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="estado" maxLength="2" placeholder="UF" ref={(input) => this.estado = input }/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                             <span className="lnr lnr-map-marker"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <input className="input100" type="text" name="cidade" maxLength="10" placeholder="Cidade" ref={(input) => this.cidade = input }/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                            <span className="lnr lnr-map"></span>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="endereco" maxLength="500" placeholder="Endereco" ref={(input) => this.endereco = input }/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-location"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <input className="input100" type="text" name="numero" maxLength="10" placeholder="Número" ref={(input) => this.numero = input }/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <span className="lnr lnr-home"></span>
                            </span>
                        </div>

                        <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <input className="input100" type="text" name="complemento" maxLength="200" placeholder="Complemento" ref={(input) => this.complemento = input }/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <span className="lnr lnr-text-align-left"></span>
                            </span>
                        </div>

                         <div className="wrap-input100 validate-input m-b-16">
                            <p>Sexo:</p>
                            <select id="dropdownSexo" onChange={this.handleDropdownChange2}>
                                <option value="">Selecione uma opção</option>
                                <option value = "F">Feminino</option>
                                <option value = "M">Masculino</option>
                                <option value = "O">Outros</option>
                            </select>
                        </div>

                        <div className="wrap-input100 validate-input m-b-16">
                            <p>Data de Nascimento:</p>
                                <input type="Date" ref={(input) => this.bithDate = input }/>
                        </div>

                         <div className="wrap-input100 validate-input m-b-16">
                            <p>Função:</p>
                            <select id="dropdownFuncao" onChange={this.handleDropdownChange3} required>
                                <option value="">Selecione uma opção</option>
                                <option value = "admin">Administrador</option>
                                <option value = "tecnico">Tecnico</option>
                                <option value = "diretor">Diretor</option>
                                <option value = "outro">Outro</option>
                            </select>
                        </div>

                         <div className="wrap-input100 validate-input m-b-16">
                            <p>Lista de hemocentros:</p>
                            <select id="dropdownHemocentros" onChange={this.handleDropdownChange4} required>
                                <option value="">Selecione uma opção</option>    
                                {this.state.usersHemocentros.map(usersHemocentros =>(
                                    <option key={usersHemocentros.hemocentroId} value = {usersHemocentros.hemocentroId}>{usersHemocentros.razaoSocial}</option>
                                ))}
                            </select>
                        </div>
     
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                             <input className="input100" type="password" name="pass" placeholder="Senha" ref={(input) => this.password = input } required/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                 <span className="lnr lnr-lock"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
                             <input className="input100" type="password" name="pass" placeholder="Confirmar Senha" ref={(input) => this.passwordConfirm = input } required/>
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