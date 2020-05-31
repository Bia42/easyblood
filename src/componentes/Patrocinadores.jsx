import React from 'react'

export default ({ patrocinadoresLinks }) => {
    return (
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
                patrocinadoresLinks && patrocinadoresLinks.map(({ razaoSocial, logo }, index) => 
                    <div className="col-md-4 col-sm-6 patrocinadores-item">
                        <a className="patrocinadores-link" data-toggle="modal" href="#patrocinadoresModal1">
                            <div className="patrocinadores-hover">
                            </div>
                            {/*<img className="img-fluid" src={ `https://unsplash.it/350/140/?${Math.floor(Math.random(0,100) * 100)}` } alt="patrocinadores_img" />*/}
                        </a>
                        <div className="patrocinadores-caption">
                            <h4>{ razaoSocial }</h4>
                        </div>
                    </div>
                )
            }
          </div>
        </div>
      </section>
    )
}