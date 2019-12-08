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

class ComunicacaoHemocentro extends Component {
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
            centrosColetores: []
        };
        var requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

        axios.get(utils.URL_BASE + '/bloodCenters', utils.novoRequestInfo(""))
            .then(response => {
                this.setState({ centrosColetores: response.data["_embedded"].bloodCenters });
            });
	}
    
    envia1(event){
		event.preventDefault();
        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";
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
        //TODO: TESTAR ISSO AQUI

        axios.post( utils.URL_BASE + '/users/login',null, requestInfo)
            .then(response => {
                axios.post(utils.URL_BASE + '/bloodCenters',
                    {
                        name:this.name.value,
                        address:{
                            longitude: this.state.lng,
                            latitude: this.state.lat
                        },
                        imageURL:this.urlImagem.value,
                        user: response.data
                    }, requestInfo)
                    .then(response => {
                        // console.log(response.data.username);
                        localStorage.setItem('dados', response.data);
                        this.props.history.push("/")
                    }).catch(e=> {
                    this.setState({msg:'não foi possível cadastrar o centro coletor'});
                    // console.log(e);
                });

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
                             Solicitação de sangue
                         </span>
                         <p>Lista de hemocentros (necessidade):</p>
                         <select>
                             {
                                 this.state.centrosColetores.map((centro, i) => <option key={i}>{centro.name}</option>)
                             }
                        </select>

                         <p>Lista de hemocentros para requisição:</p>
                         <select>
                             {
                                 this.state.centrosColetores.map((centro, i) => <option key={i}>{centro.name}</option>)
                             }
                        </select>
                             <div className="wrap-input100 validate-input m-b-16">
                                <p>Escolha o tipo Sanguinio:</p>
                                <select id="dropdown" onChange= {this.handleDropdownChange}>
                                    <option value = "A+">A+</option>
                                    <option value = "A-">A-</option>
                                    <option value = "B+">B+</option>
                                    <option value = "B-">B-</option>
                                    <option value = "AB+">AB+</option>
                                    <option value = "AB-">AB-</option>
                                    <option value = "O-">O-</option>
                                    <option value = "O+">O+</option>
                                </select>
                             </div>
                             <p>Quantidade (L):</p>

                             <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                                 <input className="input100" type="text" name="nivel" placeholder="quantidade" ref={(input) => this.quantidade = input }/>
                                 <span className="focus-input100"></span>
                             </div>
                             <div className="container-login100-form-btn p-t-25">
                                 <input type="submit" className="login100-form-btn"  value = "Enviar"/>
                            </div>

                        {/*FIM DA COLUNA DO GERENCIAMENTO*/}

                        </form>
                    </div>
                 </div>
             </div>
         </div>
        );
       }
}

export default ComunicacaoHemocentro;