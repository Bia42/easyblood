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
            cuponsGerados: [],
        };

	}

    
      
    envia(event){

      //  console.log(utils.usuarioLogado());


		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

         
        axios.post('/rest/patrocinador/gerarCupons',{
            patrocinadorId:  localStorage.getItem("Dados"),
            quantidade: this.quant.value,
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
                             Gerar Cupons
                         </span>
     
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="descricao" placeholder="Descrição"
                                    ref={(input) => this.descricao = input} required/>
                             <span className="focus-input100"></span>
                         </div>
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="quant" placeholder="Quantidade"
                                    ref={(input) => this.quant = input } required/>
                             <span className="focus-input100"></span>
                         </div>
                       
                  
                         
                         <div className="container-login100-form-btn p-t-25">
                             <input type="submit" className="login100-form-btn"  value = "Gerar"/>
                         </div>

                      
                         <div className="wrap-input100 validate-input m-b-16">
                             <textarea className="input100" rows="10" cols="33" type="text" name="dadosDoExame" placeholder="Cupons Gerados"
                                       onChange={(input) => this.setState({cuponsGerados: input.target.value}) }
                                       defaultValue={this.state.cuponsGerados} disabled/>
                             <span className="focus-input100"></span>
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
