import React, {Component} from 'react';


import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';

import axios from 'axios';
import Header from './componentes/Header';

class Login extends Component{

	constructor(){
        super()
        this.state = {msg:''}
	}
	
    envia(event){

		event.preventDefault();
        const requestInfo = {
			headers:{
				Authorization:'Basic ' + new Buffer(this.username.value + ':' + this.password.value).toString('base64')
			}
        };
		
		axios.post('https://easybloodteste.herokuapp.com/users/login',null,requestInfo)
		.then(response => {
			console.log(response.data.username);
			localStorage.setItem('dados', response.data);
			this.props.history.push("/")
			}).catch(e=> {
				this.setState({msg:'não foi possível fazer o login'});
			console.log(e);
			});

			/*
        fetch('https://easybloodteste.herokuapp.com/users/login',requestInfo)
            .then(response => {
                if(response.ok){
                    return response.text();
                } else {
                    this.setState({msg:'não foi possível fazer o login'})
                }
    
            })
            .then(token => {
                console.log(token);
            }) */
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

					<span>{this.state.msg}</span>

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

					<div className="contact100-form-checkbox m-l-4">
						<input className="input-checkbox100" id="ckb1" type="checkbox" name="remember-me"/>
						<label className="label-checkbox100" htmlFor = "ckb1">
							Remember me
						</label>
					</div>
					
					<div className="container-login100-form-btn p-t-25">
						<input type="submit" className="login100-form-btn"  value = "Login"/>
					</div>

					<div className="text-center w-full p-t-42 p-b-22">
						<span className="txt1">
							Or login with
						</span>
					</div>
					
					<a href="https://docs.microsoft.com/pt-br/visualstudio/ide/navigating-code?view=vs-2019" className="btn-face m-b-10">
						<i className="fa fa-facebook-official"></i>
						Facebook
					</a>

					<a href="#" className="btn-google m-b-10">
						<img src="./imgs/icons/icon-google.png"/>
						Google
					</a>

					<div className="text-center w-full p-t-115">
						<span className="txt1">
							Not a member?
						</span>

						<a className="txt1 hov1" href="/cadastroDoador">
							Sign up now							
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
