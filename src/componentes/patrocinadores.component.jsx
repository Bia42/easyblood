import React from 'react';

export const Card = props => (

    <div className="col-md-4 col-sm-6 patrocinadores-item">
        <a className="patrocinadores-link" data-toggle="modal" href="#patrocinadoresModal1">
            <div className="patrocinadores-hover" />            
            <img src="data:image/jpeg;base64, iVBORw0KGgoAAAANSUhEUgAAAAUA
            AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
                9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="patrocinador_img" />            
        </a>
        <div className="patrocinadores-caption">
        <h4>{ props.patrocinador.razaoSocial }</h4>
        </div>
    </div>

   
);