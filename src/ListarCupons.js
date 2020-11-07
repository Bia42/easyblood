import React, { Component } from 'react';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import * as utils from "./utils/utils";



class ListarCupons extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
            cuponsGerados: [],
            cuponsResgatados:[]
        };

        axios.post(utils.URL_BASE + '/rest/patrocinador/listCuponsAtivosPorPatrocinador',{
            patrocinadorId:  localStorage.getItem("Dados"),
            })
            .then(response => {
             console.log(response.data);
             this.setState({cuponsGerados: response.data});

            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e.response.status);
                console.log(e.response.data.cupom);
               
        });

        
        axios.post(utils.URL_BASE + '/rest/patrocinador/listCuponsResgatadosPorPatrocinador',{
            patrocinadorId:  localStorage.getItem("Dados"),
            })
            .then(response => {
             console.log(response.data);
             this.setState({cuponsResgatados: response.data});

            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e.response.status);
                console.log(e.response.data.cupom);
               
        });
            


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
                             Listagem de Cupons
                         </span>
                      
                        <h5>Cupons Ativos:</h5>
                         <select>
                         {
                             this.state.cuponsGerados.map((cupom, i) => <option key={i}>{cupom.cupom}</option>)
                         }
                         </select>   

                         <h5>Cupons Resgatados:</h5>
                         <select>
                         {
                             this.state.cuponsResgatados.map((cupom, i) => <option key={i}>{cupom.cupom}</option>)
                         }
                         </select>   
                     </form>
                 </div>
             </div>
         </div>
         </div>  
        );
       }
}

export default ListarCupons;
