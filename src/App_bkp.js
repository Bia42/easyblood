import React, {Component} from 'react';
import './css/pure-min.css';
import './css/marketing.css';
import './App.css';

import Header from './componentes/Header';
import Map from "./componentes/Map";
import * as utils from "./utils/utils";
import axios from "axios";

class App extends Component{

    constructor(props) {
       super(props);
     /*    this.state = {
            requests: []
        };
       var requestInfo = utils.novoRequestInfo("");
    if (requestInfo == null)
            window.location = "/login";

        axios.get(utils.URL_BASE + '/requests', utils.novoRequestInfo(""))
            .then(response => {
                console.log("response");
                console.log(response);
                console.log("response");
                this.setState({requests: response.data["_embedded"].requests});
            });
            */
    }

  render(){
   return (
    <div>
        <Header/>

        <div className="splash-container">
            <div className="splash">
                <h1 className="splash-head">
                <img src="../logo.png" className="pure-img-responsive"/>
                <p className="splash-subhead">
                    Existe um centro coletor precisando de você!
                </p>
                </h1>
            </div>
        </div>
        
    { /*  <div id="content-wrapper" className="content-wrapper">
            <div className="content">
                <p>
                    <a href="#content-wrapper" className="pure-button pure-button-primary buscar">Consultar centros coletores</a>
                </p>


             <h2  className="content-head is-center">Requisições de sangue</h2>
                <ul>
                    {
                        this.state.requests.map((req, i)  => (
                            <li key={i}> O centro "{req.inNeed}" pediu {req.liters} litros de {req.bloodType} para o centro "{req.requested}" </li>
                        ))}
                </ul>
            </div>
        </div>*/} 
                            


    </div>

   );
  }

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
}

export default App;
