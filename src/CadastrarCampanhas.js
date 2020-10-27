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

class CadastrarCampanhas extends Component {
    
    constructor(props){
        super(props)
        this.state = {msg:'',
            show: false,
            btn_show: true,
            loading: false
        };

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

         
        axios.post('/rest/patrocinador/cadastrarCampanhas',{
            patrocinadorId:  localStorage.getItem("Dados"),
            quantCupons: this.quant.value,
            descricao: this.descricao.value
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
                this.quant.value = "";
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

        return (
        
         <div> 
         <Header/>
         <div className="limiter">
             <div className="container-login100">
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                     <form className="login100-form validate-form">
                         <span className="login100-form-title p-b-55">
                             Cadastrar Campanhas
                         </span>
     
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="descricao" placeholder="Descrição"
                                    ref={(input) => this.descricao = input} required/>
                             <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <span className="lnr lnr-text-align-justify"></span>
						    </span>
                         </div>
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="quant" placeholder="Quantidade de Cupons "
                                    ref={(input) => this.quant = input } required/>
                             <span className="focus-input100"></span>
                            <span className="symbol-input100">
                                <span className="lnr lnr-question-circle"></span>
						    </span>
                         </div>                  

                         <Button  className="login100-form-btn" variant="primary" onClick={this.envia.bind(this)} >
                            {loading && (
                                <i
                                className="fa fa-refresh fa-spin"
                                style={{ marginRight: "5px" }}
                                />
                            )}
                            {loading && <span>Criando Campanha</span>}
                            {!loading && <span>Criar</span>}
                        </Button>

                          <Snackbar open={this.state.show} autoHideDuration={6000} onClose={()=>{this.handleClose()}}>
                            <Alert onClose={()=>{this.handleClose()}} severity="success">
                              Campanha cadastrada com sucesso!
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

export default CadastrarCampanhas;
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

  

