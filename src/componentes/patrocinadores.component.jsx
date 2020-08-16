import React from 'react';
import * as utils from "../utils/utils";


export const Card = props => (

    <div className="col-md-4 col-sm-6 patrocinadores-item">
        <a className="patrocinadores-link" data-toggle="modal" href="#patrocinadoresModal1">
            <div className="patrocinadores-hover"/>       
             <img src={"data:image/jpeg;base64," + props.patrocinador.logo} alt="patrocinador_img" className="img-fluid" id="firstname" /> 
        </a>
        <div className="patrocinadores-caption">
            <h4>{ props.patrocinador.razaoSocial }</h4>
        </div>
    </div>

   
);