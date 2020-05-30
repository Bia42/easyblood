import React, {Component} from 'react';


import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import * as utils from './utils/utils';

import axios from 'axios';
import Header from './componentes/Header';

class Login extends Component{

	constructor(){
        super()
		this.state = {msg:'', selectTipo: ''}
		
		this.handleTipo = this.handleTipo.bind(this);

	}

	handleTipo(e) {
		console.log(e.target.value);
        this.setState({ selectTipo: e.target.value });
      }
	
    envia(event){

		event.preventDefault();
        const requestInfo = {
			headers:{
				Authorization:'Basic ' + new Buffer(this.username.value + ':' + this.password.value).toString('base64')
			}
		};
		
		if(this.state.selectTipo == 'C'){
			axios.post('/rest/hemocentro/login',{
				email: this.username.value,
				senha: this.password.value,
				})
			.then(response => {
				// console.log("response:");
				// console.log(response);
				localStorage.setItem('Authorization', requestInfo.headers.Authorization);
				window.location = "/";
				})
				.catch(e=> {
					// console.log("e.resp:");
					 console.log(e.response.status);
					 console.log(e.response.data);
					 this.setState({msg: e.response.data});
				});
		}else{
			axios.post('/rest/patrocinador/login',{
				email: this.username.value,
				senha: this.password.value,
				})
			.then(response => {
				// console.log("response:");
				// console.log(response);
				localStorage.setItem('Authorization', requestInfo.headers.Authorization);
				window.location = "/";
				})
				.catch(e=> {
					// console.log("e.resp:");
					 console.log(e.response.status);
					 console.log(e.response.data);
					 this.setState({msg: e.response.data});
				});
		}
		
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
							Login
						</span>

						<span className="text-center p-b-55 mensagem-erro">{this.state.msg}</span>

					
					<div className="wrap-input100 validate-input m-b-16">
							<input type="radio" id="colaborador" name="tipo" value="C" onChange={this.handleTipo}/>
							<label for="colaborador">Colaborador</label>
							<input type="radio" id="patrocinador" name="tipo" value="P" onChange={this.handleTipo} />
							<label for="patrocinador">Patrocinador</label>
                	</div>

					<div className="wrap-input100 validate-input m-b-16" data-validate = "Valid email is required: ex@abc.xyz">
						<input className="input100" type="text" name="email" placeholder="Email" ref={(input) => this.username = input } required/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<span className="lnr lnr-envelope"></span>
						</span>
					</div>

						<div className="wrap-input100 validate-input m-b-16" data-validate = "Password is required">
							<input className="input100" type="password" name="pass" placeholder="Password" ref={(input) => this.password = input } required/>
							<span className="focus-input100"></span>
							<span className="symbol-input100">
								<span className="lnr lnr-lock"></span>
							</span>
						</div>

						{/*<div className="contact100-form-checkbox m-l-4">*/}
						{/*	<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>*/}
						{/*	<label className="label-checkbox100" htmlFor = "ckb1">*/}
						{/*		Remember me*/}
						{/*	</label>*/}
						{/*</div>*/}
						
						<div className="container-login100-form-btn p-t-25">
							<input type="submit" className="login100-form-btn"  value = "Login"/>
						</div>
						<div className="text-center w-full p-t-15">
							<span className="txt1">
								Não está cadastrado?
							</span>
						</div>
						<div className="container-login100-form-btn p-t-25">
							<a className="txt1 hov1" href="/cadastroDoador">
								Cadastre-se agora!
							</a>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>  
   );
  }
}
export default Login;