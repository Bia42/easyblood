import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './css/main.css';
import './css/util.css';
import './css/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './css/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './css/vendor/animate/animate.css';
import axios from 'axios';
import Header from './componentes/Header';

class AlterarDadosDoador extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
            doadorBusca: {},
            show: false,
            btn_show: true,
            loading: false
        };
        this.procurarCpf = this.procurarCpf.bind(this);
        this.btn_handleModal_on = this.btn_handleModal_on.bind(this);
    }

    handleModal()
    {
        this.setState({show: !this.state.show})
    }

    btn_handleModal_on(e) 
    {
        this.setState({btn_show: false})
    }
        
    procurarCpf(e) {
        axios.post('/rest/doador/historico',{
            cpf:  this.cpf.value,
            })
            .then(response => {
             console.log(response.data);
             this.setState({doadorBusca: response.data});
            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e.response.status);
                console.log(e.response.data.cupom);
        });

        setTimeout(() => {
            this.handleModal()
          }, 3000);

        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 3000);        

        this.setState({btn_show: true})

        setTimeout(() => {
            this.cpf.value = "";
        }, 3000);
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
                             Histórico do Doador
                         </span>
     
                         <span className="wrap-input100 validate-input m-b-16" >Digite o CPF para Buscar</span>

                         <div className="wrap-input100 validate-input m-b-16" data-validate = "" open={this.state.modalOpen} toggle={this.toggle}>
                             <input className="input100" type="text" name="cpf" placeholder="CPF"
                                    ref={(input) => this.cpf = input }
                                    onChange={this.btn_handleModal_on}/>
                             <span className="focus-input100"></span>
                             <span className="symbol-input100">
                                <span className="lnr lnr-license"></span>
                             </span>                             
                         </div>

                        <Button  className="login100-form-btn" variant="primary" onClick={this.procurarCpf} disabled={this.state.btn_show}>
                            {loading && (
                                <i
                                className="fa fa-refresh fa-spin"
                                style={{ marginRight: "5px" }}
                                />
                            )}
                            {loading && <span>Carregando Histórico</span>}
                            {!loading && <span>Buscar Histórico</span>}
                        </Button>
                         
                         <Modal show={this.state.show} onHide={()=>{this.handleModal()}} centered size="lg" aria-labelledby="contained-modal-title-vcenter">
                         <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Histórico
                            </Modal.Title>
                         </Modal.Header>
                         <Modal.Body>
                            <h4>{this.state.doadorBusca.nome}</h4>
                            <br/>
                            <h6>Email: {this.state.doadorBusca.email}</h6>
                            <br/>
                            <h6>Tipo Sanguineo: {this.state.doadorBusca.tipoSanguineo}</h6>
                            <br/>
                            <p>
                            <h6>{this.state.doadorBusca.historico || ""}</h6>
                            </p>
                         </Modal.Body>
                         <Modal.Footer>
                            <Button onClick={()=>{this.handleModal()}}>
                                Fechar
                            </Button>
                         </Modal.Footer>
                         </Modal>
                     </form>
                 </div>
             </div>
         </div>
         </div>  
        );
       }
}

export default AlterarDadosDoador;