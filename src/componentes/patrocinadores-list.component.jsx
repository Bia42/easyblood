import React from 'react';

import { Card } from './patrocinadores.component.jsx';

export const CardList = props => (

    <section className="bg-light page-section" id="patrocinadores">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Patrocinadores</h2>
              <h3 className="section-subheading text-muted">Patrocinadores do projeto.</h3>
            </div>
          </div>
          <div className="row">
            {
                props.patrocinadores.map(patrocinador => ( 
                    <Card key={patrocinador.id} patrocinador={patrocinador}/>
                ))           
            }
          </div>
        </div>
      </section>
);