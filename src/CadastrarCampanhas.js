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
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



class CadastrarCampanhas extends Component {
    
    constructor(props){
        super(props)
        this.state = {msg:'',
            cuponsGerados: [],
        };

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
             this.setState({cuponsGerados: response.data});
             
            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e.response.status);
                console.log(e.response.data);
               
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
                         <div className="container-login100-form-btn p-t-25">
                             <input type="submit" className="login100-form-btn"  value = "Criar"/>
                         </div>
                        <CustomizedSnackbars/>
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

  
function CustomizedSnackbars() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
  
    return (
      <div className={classes.root}>
        <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>
        <Alert severity="error">This is an error message!</Alert>
        <Alert severity="warning">This is a warning message!</Alert>
        <Alert severity="info">This is an information message!</Alert>
        <Alert severity="success">This is a success message!</Alert>
      </div>
    );
  }
  
