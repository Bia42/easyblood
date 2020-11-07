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
import Button from 'react-bootstrap/Button';

class GerarRelatorio extends Component {
    constructor(props){
        super(props)
        this.state = {msg:'',
        btn_show: false,
        loading: false
        }
        this.gerarRelatorio = this.gerarRelatorio.bind(this);
        this.btn_handleModal_on = this.btn_handleModal_on.bind(this);
    }

    btn_handleModal_on(e) 
    {
        this.setState({btn_show: true})
    }
    
    gerarRelatorio(e) {
        axios.post(utils.URL_BASE + '/rest/hemocentro/relatorioNivel',{
            hemocentroId: utils.getCookie(),
            }, {responseType: 'arraybuffer'})            
            .then(response => {
             console.log(response);
             const file = new Blob([response.data], {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL);
            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e);
        });    
        
        this.setState({ loading: true });

        setTimeout(() => {
            this.setState({ loading: false });
        }, 6000); 

        this.setState({ btn_show: true });

        setTimeout(() => {
            this.setState({ btn_show: false });
        }, 6000);
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
                            Gerar Relatório
                         </span>
                            <Button className="login100-form-btn" variant="primary" onClick={this.gerarRelatorio} disabled={this.state.btn_show}>
                                {loading && (
                                    <i
                                    className="fa fa-refresh fa-spin"
                                    style={{ marginRight: "5px" }}
                                    />
                                )}
                                {loading && <span>Gerando</span>}
                                {!loading && <span>Gerar</span>}
                            </Button>
                        </form>  
                    </div>
                </div>
             </div>
         </div>
       
        );
       }
}

export default GerarRelatorio;