import React, { Component } from 'react';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import './css/pure-min.css';
import * as utils from "./utils/utils";
import { cpfMask } from "./utils/mask";
import format from 'date-fns/format'

class PatrocinadoresPendentes extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
        selectValue: "",
        selectValueSexo: "",
        selectValueFuncao: "",
        checkinPendentes: [],
        selectValueUsersHemocentros:"",
        selectCPF:""
        }

        this.procurarCheckIn = this.procurarCheckIn.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);

        this.procurarCheckIn();
    }
    
    procurarCheckIn(e) {

        axios.get(utils.URL_BASE + '/rest/patrocinador/listPatrocinadoresPendentes')
            .then(response => {
             console.log(response.data);
             this.setState({checkinPendentes: response.data});
            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e);
        });    

    }

    handleClick(id) {
        console.log(id);

        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

         
        axios.post(utils.URL_BASE + '/rest/patrocinador/confirmacao',{
            id:  id
            })
            .then(response => {
               console.log(response.data);

              setTimeout(() => {
                this.procurarCheckIn()
              }, 3000);
            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e);
               
        });

      }
      handleClick2(id) {
        console.log(id);

        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

         
        axios.post(utils.URL_BASE + '/rest/patrocinador/excluir',{
            id:  id
            })
            .then(response => {
               console.log(response.data);

              setTimeout(() => {
                this.procurarCheckIn()
              }, 3000);
            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e);
               
        });

      }
    envia(event){

		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("")
        
    }
    
    render(){

        return (
         <div> 
         <Header/>
         <div className="limiter">
             <div className="container-login100">
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                     <form className="login100-form validate-form" >
                         <span className="login100-form-title p-b-55">
                            Avaliação de Patrocinadores
                         </span>
                        <div>            
                            <table className="table table-sm  table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">Razão Social</th>
                                    <th scope="col">CNPJ</th>
                                    <th scope="col">Excluir</th>                                   
                                    <th scope="col" >Confirmar</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.checkinPendentes.map(checkinPendentes =>(
                                    <tr key={checkinPendentes.id}>
                                        <td>{checkinPendentes.razaoSocial}</td>
                                        <td>{checkinPendentes.cnpj}</td>
                                        <td className="padding10">
                                            <button href="#" className="btn btn-danger btn-sm lixeira" onClick={() => this.handleClick2(checkinPendentes.id)} ><i className="delete fa fa-trash"></i></button>
                                        </td>
                                        <td>
                                            <button type="button" id="btnValida" className="btn btn-success btn-sm teste" data-toggle="modal"
                                            data-target="#exampleModal" onClick={() => this.handleClick(checkinPendentes.id)}>Confirmar</button>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table> 
                            </div>
                        </form>  
                    </div>
                </div>
             </div>
         </div>
       
        );
       }
}

export default PatrocinadoresPendentes;