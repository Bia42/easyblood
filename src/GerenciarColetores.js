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
            centrosColetores: [],
            selectedAtualizarSangue: {},
            sangueSelecionado: ""
        };
        var requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

        axios.get(utils.URL_BASE + '/bloodCenters', utils.novoRequestInfo(""))
            .then(response => {
                this.setState({ centrosColetores: response.data["_embedded"].bloodCenters });
            });

        this.handleDropdownChangeBloodCenterSelecionado = this.handleDropdownChangeBloodCenterSelecionado.bind(this);
        this.handleDropdownChangeSangueSelecionado = this.handleDropdownChangeSangueSelecionado.bind(this);
    }

 

    handleDropdownChangeBloodCenterSelecionado(e) {
        var centros = this.state.centrosColetores;
        this.setState({ selectedAtualizarSangue: centros.find(x => x.name === e.target.value)});
    }

    handleDropdownChangeSangueSelecionado(e) {
        this.setState({ sangueSelecionado: e.target.value});
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
    }

    enviaCadastro(event){
        event.preventDefault();
        const requestInfo = utils.novoRequestInfo("");
        if(requestInfo == null)
            window.location = "/login";

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

    enviaAtualizaSangue(event) {
        event.preventDefault();

        let bloodCenterSelecionado = this.state.selectedAtualizarSangue;

        var urlUpdate = bloodCenterSelecionado._links.self;

        var nivel = this.nivel.value;
        var sangueSelecionado = this.state.sangueSelecionado;

        

        if(bloodCenterSelecionado.bloodList === null  || bloodCenterSelecionado.bloodList.length < 1)
            bloodCenterSelecionado.bloodList = [];

        var tipoSangue = bloodCenterSelecionado.bloodList.find(x => x.type === sangueSelecionado);
        //Se já tem o tipo de sangue
        if(tipoSangue === undefined)
            bloodCenterSelecionado.bloodList.push({"type": sangueSelecionado, "liters": nivel});
        else
            bloodCenterSelecionado.bloodList.find(x => x.type === sangueSelecionado).liters = nivel;

        const requestInfo = utils.novoRequestInfo(bloodCenterSelecionado);
        if(requestInfo == null)
            window.location = "/login";

        axios.patch(urlUpdate.href, bloodCenterSelecionado, requestInfo)
            .then(response => {
                console.log("deu certo")
                this.setState({msg:'Nível de Sangue Atualizado'});
                this.nivel.value = "";
                alert('Nível de Sangue Atualizado');
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
                     <form className="login100-form validate-form"  onSubmit={this.enviaCadastro.bind(this)}>
                         <span className="login100-form-title p-b-55">
                             Cadastrar um Centro Coletor
                         </span>


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
                     <form className="login100-form validate-form"  onSubmit={this.enviaAtualizaSangue.bind(this)}>
                         <span className="login100-form-title p-b-55">
                             Selecione um de seus centros coletores
                         </span>
                         
                         <span>{this.state.msg}</span>

                         <p>Lista de hemocentros:</p>
                         <select onChange= {this.handleDropdownChangeBloodCenterSelecionado}>
                         {
                             this.state.centrosColetores.map((centro, i) => <option key={i}>{centro.name}</option>)
                         }
                         </select>
                         <div className="wrap-input100 validate-input m-b-16">
                            <p>Escolha o tipo Sanguinio:</p>
                            <select id="dropdown" onChange= {this.handleDropdownChangeSangueSelecionado}>
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
                         <p>Nível de sangue atual em litros:</p>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "">
                             <input className="input100" type="number"  min="1" max="2000" name="nivel" placeholder="Nivel" ref={(input) => this.nivel = input }/>
                             <span className="focus-input100"></span>
                         </div>
                         <div className="container-login100-form-btn p-t-25">
                             <input type="submit" className="login100-form-btn"  value = "Atualizar"/>
                        </div>
                    </form>
                 </div>
                 {/*FIM DA COLUNA DO GERENCIAMENTO*/}
             </div>

         </div>
         </div>  
        );
       }
}

export default GerenciarColetores;
