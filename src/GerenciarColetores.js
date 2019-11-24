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

class GerenciarColetores extends Component {
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

                 {/*COLUNA DO CADASTRO*/}
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30 margem-direita">
                     <form className="login100-form validate-form"  onSubmit={this.envia.bind(this)}>
                         <span className="login100-form-title p-b-55">
                             Cadastrar um Centro Coletor
                         </span>

                         <span>{this.state.msg}</span>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="nome" placeholder="Nome" ref={(input) => this.name = input }/>
                             <span className="focus-input100"></span>
                         </div>
                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="text" name="urlImagem" placeholder="URL da Imagem" ref={(input) => this.urlImagem = input }/>
                             <span className="focus-input100"></span>
                         </div>


                         <div className="map">
                             <h3>Endereço:</h3>

                             <Map
                                 google={this.props.google}
                                 center={{lat: -22.8336113, lng: -47.0497247}}
                                 height='500px'
                                 zoom={15}
                                 escutadorDeInput={this.escutadorDeInput}
                             />

                         </div>
                         <div className="container-login100-form-btn p-t-25">
                             <input type="submit" className="login100-form-btn"  value = "Cadastrar"/>
                         </div>

                     </form>
                 </div>
                 {/*FIM DA COLUNA DO CADASTRO*/}

                 {/*COLUNA DO GERENCIAMENTO*/}
                 <div className="wrap-login100 p-l-50 p-r-50 p-t-77 p-b-30">

                     <span className="login100-form-title p-b-55">
                         Selecione um de seus centros coletores
                     </span>

                     {this.state.centrosColetores.map((centro, i) => <div key={i}>{centro.name}</div>)}

                 </div>
                 {/*FIM DA COLUNA DO GERENCIAMENTO*/}

             </div>

         </div>
         </div>  
        );
       }
}

export default GerenciarColetores;
