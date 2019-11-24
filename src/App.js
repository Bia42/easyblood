import React, {Component} from 'react';
import './css/pure-min.css';
import './css/marketing.css';
import './App.css';

import Header from './componentes/Header';
import Map from "./componentes/Map";

class App extends Component{

  render(){
   return (
    <div>
        <Header/>

        <div className="splash-container">
            <div className="splash">
                <h1 className="splash-head">
                <img src="../logo.png"></img>
                <p className="splash-subhead">
                    Existe um centro coletor precisando de você!
                </p>
                </h1>
            </div>
        </div>

        <div id="content-wrapper" className="content-wrapper">
            <div className="content">
                <p>
                    <a href="#content-wrapper" className="pure-button pure-button-primary buscar">Consultar centros coletores</a>
                </p>


                <h2  className="content-head is-center">Esses são os centros coletores cadastrados</h2>

                <Map
                    google={this.props.google}
                    center={{lat: -22.8336113, lng: -47.0497247}}
                    height='600px'
                    zoom={15}
                    escutadorDeInput={this.escutadorDeInput}
                />
            </div>
        </div>




    </div>

   );
  }

    escutadorDeInput = event => {
        console.log(event);
        console.log(event.markerPosition.lng);

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
