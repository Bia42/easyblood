import React, { Component } from 'react';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import * as utils from "./utils/utils";
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import { makeStyles } from '@material-ui/core/styles';

class DivulgarCampanhas extends Component {
    
    constructor(props){
        super(props)
        this.state = {msg:'',
            show: false,
            btn_show: true,
            loading: false,
            campanhas: [],
            selectValueCampanha:"",
            selectValueTipoSangue: "",
            logo:""
        };

        this.handleDropdownChange3 = this.handleDropdownChange3.bind(this);
        this.handleDropdownChange4 = this.handleDropdownChange4.bind(this);

  }  
      
  componentDidMount(){
    fetch(utils.URL_BASE + '/rest/hemocentro/listCampanhas')
    .then (response => response.json())
    .then (listCampanhas => this.setState({campanhas: listCampanhas}));
  }

  handleDropdownChange3(e) {
    this.setState({ selectValueTipoSangue: e.target.value });
  }
  handleDropdownChange4(e) {
    this.setState({ selectValueCampanha: e.target.value });
  }
  
  handleClick()
  {
      this.setState({show: !this.state.show})
  }
  handleClose()
  {
      this.setState({show: !this.state.show})
  }
      
    envia(event){

      //  console.log(utils.usuarioLogado());


		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

         
        axios.post(utils.URL_BASE + '/rest/hemocentro/dilvugarCampanha',{
            descricao: this.descricao.value,
            tipoSangue:  this.state.selectValueTipoSangue,
            conteudo: this.state.logo
            })
            .then(response => {
               console.log(response.data);

              setTimeout(() => {
                this.handleClick()
              }, 3000);
              
            this.setState({ loading: true });

            setTimeout(() => {
                this.setState({ loading: false });
            }, 3000);     
                setTimeout(() => {
                this.descricao.value = "";
             }, 3000);

            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e.response.status);
                console.log(e.response.data);
               
        });
            
            
    }
    
    render(){
        const { loading } = this.state;
                
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

        return (
        
         <div> 
         <Header/>
         <div className="limiter">
             <div className="container-login100">
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                     <form className="login100-form validate-form">
                         <span className="login100-form-title p-b-55">
                             Divulgar Campanhas
                         </span>
     
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">

                            <textarea className="input100" rows="10" cols="33" type="text" name="descricao" placeholder="Descrição da Campanha" ref={(input) => this.descricao = input} required/>
                            <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <span className="lnr lnr-text-align-justify"></span>
						    </span>
                         </div>
                         
                         <div className="wrap-input100 validate-input m-b-16">
                            <p>Tipo de Sangue:</p>
                            <select id="dropdownTipoSangue" onChange={this.handleDropdownChange3} required>
                                <option value="">Selecione uma opção</option>
                                <option value = "T">Todos</option>
                                <option value = "A+">A+</option>
                                <option value = "A-">A-</option>
                                <option value = "B+">B+</option>
                                <option value = "B-">B-</option>
                                <option value = "AB+">AB+</option>
                                <option value = "AB-">AB-</option>
                                <option value = "O+">O+</option>
                                <option value = "O-">O-</option>
                            </select>
                        </div>

                        <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                            <p>Art Campannha:</p>
                            <input
                                    type="file"
                                    accept=".jpeg, .tif, .jpg, .png"
                                    className="company-register_file_input"
                                    onInput={e => getFileAndConvert(e.target.files[0])}
                                />
                         </div>             
                        
                        <Button className="login100-form-btn" variant="primary" onClick={this.envia.bind(this)} >
                            {loading && (
                                <i
                                className="fa fa-refresh fa-spin"
                                style={{ marginRight: "5px" }}
                                />
                            )}
                            {loading && <span>Divulgando Campanhas</span>}
                            {!loading && <span>Divulgar Campanha</span>}
                        </Button>

                          <Snackbar open={this.state.show} autoHideDuration={6000} onClose={()=>{this.handleClose()}}>
                            <Alert onClose={()=>{this.handleClose()}} severity="success">
                                    Campanha divulgada com sucesso
                            </Alert>
                         </Snackbar>
                     </form>
                 </div>
             </div>
         </div>
         </div>  
        );
       }
}

export default DivulgarCampanhas;

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  

