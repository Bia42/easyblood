import React, { Component } from 'react';

import * as utils from './utils/utils';

import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';
import Map from './componentes/Map';

class CadastroRequisitos extends Component {
    constructor(props){
        super(props)
        this.state = {
            msg:'',
            name: '',
            city:'',
            area: '',
            state: '',
            address: '',
            lat: '',
            lng: '',
            centrosColetores: [],
            bloodCenterSelecionado: {}
        };
        var requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

        axios.get(utils.URL_BASE + '/bloodCenters', utils.novoRequestInfo(""))
            .then(response => {
                this.setState({ centrosColetores: response.data["_embedded"].bloodCenters });
            });

        this.handleDropdownChangeSelecionado = this.handleDropdownChangeSelecionado.bind(this);
    }

    handleDropdownChangeSelecionado(e) {
        var centroSelecionado = this.state.centrosColetores.find(x => x.name === e.target.value);
        centroSelecionado.requirements = this.requisitos;
        this.setState({ bloodCenterSelecionado: centroSelecionado});
    }

    //https://easybloodteste.herokuapp.com/swagger-ui.html#/
    escutadorDeInput = event => {
        // console.log(event);
        // console.log(event.markerPosition.lng);

        this.setState({
            city: event.city,
            area: event.area,
            state: event.state,
            address: event.address,
            lat:event.markerPosition.lat,
            lng:event.markerPosition.lng

        });
    }

    envia(event){
        event.preventDefault();
        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

        axios.patch(this.state.bloodCenterSelecionado._links.self.href, this.state.bloodCenterSelecionado, requestInfo)
            .then(response => {
                console.log("deu certo");
            });
    }

    render(){
        return (
         <div> 
         <Header/>
         <div className="limiter">
             <div className="container-login100">
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">
                 {/*COLUNA DO GERENCIAMENTO*/}
                   <form className="login100-form validate-form"  onSubmit={this.envia.bind(this)}>

                         <span className="login100-form-title p-b-55">
                             Cadastro de Requisitos
                         </span>
                         <p>Lista de hemocentros:</p>
                         <select onChange= {this.handleDropdownChangeSelecionado}>
                             {
                                 this.state.centrosColetores.map((centro, i) => <option key={i}>{centro.name}</option>)
                             }
                        </select>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <textarea className="input100" type="text" name="requisitos" placeholder="requisitos" onChange={(input) => this.requisitos = input.target.value }/>
                             <span className="focus-input100"></span>
                         </div>
                         <div className="container-login100-form-btn p-t-25">
                             <input type="submit" className="login100-form-btn"  value = "Cadastrar"/>
                        </div>
                   </form>
                 </div>

                 {/*FIM DA COLUNA DO GERENCIAMENTO*/}

             </div>

         </div>
         </div>  
        );
       }
       /**/
}

export default CadastroRequisitos;
