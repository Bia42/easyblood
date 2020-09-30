import React, { Component } from 'react';
import { render } from 'react-dom'
import DemoApp from './DemoApp'
import './main.css'
import Header from '../componentes/Header';

class agenda extends Component  {
    render() {
        return (
        <div> 
            <Header/>
            <div className="limiter">
                <DemoApp />
            </div>
        </div>
        )
    };
}
export default agenda;