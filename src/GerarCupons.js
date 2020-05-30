import React, { Component } from 'react';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import * as utils from "./utils/utils";



class GerarCupons extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
            doadorBusca: {},
            dadosDoExame: ""
        };
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownChange2 = this.handleDropdownChange2.bind(this);
        this.procurarCpf = this.procurarCpf.bind(this);
	}

    
    handleDropdownChange(e) {
        var doador = this.state.doadorBusca;
        doador.bloodType = e.target.value;
        this.setState({ doadorBusca: doador });
    }
    handleDropdownChange2(e) {
        var doador = this.state.doadorBusca;
        doador.sex = e.target.value;
        this.setState({ doadorBusca: doador });
    }
    procurarCpf(e) {
        if(e.target.value.length < 11)
            return;
        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

        axios.get(utils.URL_BASE + "/users/" + e.target.value, requestInfo).then(response => {
            console.log(response.data.bloodType);
            if(response.data !== undefined)
                this.setState({doadorBusca: response.data});
            else
                console.log("ERRO");

        });
    }
      
    envia(event){


		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

        var body = {
            cpf: this.cpf.value,
            name: this.name.value,
            username: this.username.value,
            report: this.state.dadosDoExame,
            sex: this.state.doadorBusca.sex,
            bloodType: this.state.doadorBusca.bloodType
        };
        console.log("enviado");
        console.log(body);
		axios.patch(utils.URL_BASE + '/users/' + this.state.doadorBusca.cpf, body, requestInfo)
		.then(response => {
			console.log(response);
            alert("Os dados foram atualizados!");
			}).catch(e=> {
				this.setState({msg:'não foi possível fazer o login'});
			console.log(e);
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
                             Alterar dados do Doador
                         </span>
     
                         <span className="wrap-input100 validate-input m-b-16" > Digite O CPF para Buscar</span>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="nome" placeholder="Nome"
                                    ref={(input) => this.name = input} defaultValue={this.state.doadorBusca.name || ""}/>
                             <span className="focus-input100"></span>
                         </div>
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="cpf" placeholder="CPF"
                                    ref={(input) => this.cpf = input }
                                    onChange={this.procurarCpf}/>
                             <span className="focus-input100"></span>
                         </div>
                         
                         <div className="wrap-input100 validate-input m-b-16">
                            <p>Alterar o tipo Sanguinio:</p>
                            <select id="dropdown" onChange= {this.handleDropdownChange}
                                    value={this.state.doadorBusca.bloodType}>
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
                            <select id="dropdownSexo" onChange= {this.handleDropdownChange2}
                                    value={this.state.doadorBusca.sex}>
                                <option value = "F">F</option>
                                <option value = "M">M</option>
                                <option value = "O">Outros</option>
                            </select>
                        </div>

                        <div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
                             <input className="input100" type="text" name="email" placeholder="Email"
                                    ref={(input) => this.username = input }
                                    defaultValue={this.state.doadorBusca.email}/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                 <span className="lnr lnr-envelope"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16">
                             <textarea className="input100" rows="10" cols="33" type="text" name="dadosDoExame" placeholder="Dados do Exame"
                                       onChange={(input) => this.setState({dadosDoExame: input.target.value}) }
                                       defaultValue={this.state.doadorBusca.report}/>
                             <span className="focus-input100"></span>
                         </div>                        
                         
                         <div className="container-login100-form-btn p-t-25">
                             <input type="submit" className="login100-form-btn"  value = "Alterar"/>
                         </div>
                     </form>
                 </div>
             </div>
         </div>
         </div>  
        );
       }
}

export default GerarCupons;
