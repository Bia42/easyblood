import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import * as utils from "./utils/utils";
import format from 'date-fns/format'



class CadastroPatrocinador extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
        selectValue: "",
        selectValueSexo: "",
        selectValueFuncao: "",
        usersHemocentros: [],
        selectValueUsersHemocentros:"",
        selectcnpj:"",
        selectedFile: null,
        logo:"",
        show: false,
        btn_show: true,
        loading: false,
        msg:''
        }

        this.handleDropdownChange = this.handleDropdownChange.bind(this);
        this.handleDropdownChange2 = this.handleDropdownChange2.bind(this);
        this.handleDropdownChange3 = this.handleDropdownChange3.bind(this);
        this.handleDropdownChange4 = this.handleDropdownChange4.bind(this);

    }
    handleModal()
    {
        this.setState({show: !this.state.show})
        if(this.state.show = false){
			this.props.history.push("/")
        }
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
  
    envia(event){

		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("")

        console.log({
            cnpj: this.cnpj.value,
            razaoSocial: this.name.value,
            senha: this.password.value,
            email: this.email.value,
            telefone: this.telefone.value,
            estado: this.estado.value,
            cidade: this.cidade.value,
            endereco: this.endereco.value,
            numero: this.numero.value,
            cep: this.cep.value,
            complemento: this.complemento.value,
            logo: this.state.logo
            });
        

		axios.post(utils.URL_BASE + '/rest/patrocinador/add',   {
        cnpj: this.cnpj.value,
        razaoSocial: this.name.value,
        senha: this.password.value,
        email: this.email.value,
        telefone: this.telefone.value,
        estado: this.estado.value,
        cidade: this.cidade.value,
        endereco: this.endereco.value,
        numero: this.numero.value,
        cep: this.cep.value,
        complemento: this.complemento.value,
        logo: this.state.logo
        }, {responseType: 'arraybuffer'})
		.then(response => {
            console.log(response);
                const file = new Blob([response.data], {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
                setTimeout(() => {
                    this.handleModal()
                  }, 3000);
                  setTimeout(() => {
                    this.props.history.push("/")
                }, 6000);

                
			localStorage.setItem('dados', response.data);
		
			}).catch(error=> {
				this.setState({msg: error.response.data});
			    console.log(error);
            });
            
    }
    
    render(){
        
        const getFileAndConvert = async (file) => {
            if (file && file.type.includes('image')) {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                //onFormDataChange(reader.result, 'base64Logo'); // aqui vc vai atualizar o seu state
                console.log(reader.result)
                this.setState({ logo: reader.result});
              };
              reader.onerror = (error) => {
                console.log(error);
              };
            } else {
              console.log('Esse tipo de arquivo não é suportado!');
            }
          };
         // const encodedData = 'R0lGODlhAQABAIAAAAAA...7';
        // <Image source={{uri:   'data:image/jpeg;base64,${encodedData}'}} />

        return (
         <div> 
         <Header/>
         <div className="limiter">
             <div className="container-login100">
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                     <form className="login100-form validate-form"  onSubmit={this.envia.bind(this)}>

                         <span className="login100-form-title p-b-55">
                             Solicitação de Cadastro
                         </span>                         
                             
                         <span>{this.state.msg}</span>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="nome" placeholder="Razão Social" ref={(input) => this.name = input } required/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-user"></span>
                             </span>
                         </div>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="CNPJ" maxLength="14" placeholder="CNPJ" onChange={this.handleDropdownChange5} ref={(input) => this.cnpj = input } required/>
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
        
                        <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <p>Logo:</p>
                            <input
                                    type="file"
                                    accept=".jpeg, .tif, .jpg, .png"
                                    className="company-register_file_input"
                                    onInput={e => getFileAndConvert(e.target.files[0])}
                                />
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
                         <Modal show={this.state.show} onHide={()=>{this.handleModal()}} centered size="lg" aria-labelledby="contained-modal-title-vcenter">
                         <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Solicitação de cadastro 
                            </Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                            <h4>AVISO</h4>
                            <p>Enviar o contrato assinado para o email de suporte doemais: doemais.contato@gmail.com</p>
                            <p>Após a liberação, enviaremos um email comunicando</p>
                         </Modal.Body>
                         <Modal.Footer>
                            <Button onClick={()=>{this.handleModal()}}>
                                Fechar
                            </Button>
                         </Modal.Footer>
                         </Modal>
                     </form>
                 </div>
             </div>
         </div>
         </div>  
        );
       }
}

export default CadastroPatrocinador;