import React, { Component } from 'react';
import './agenda.css'

//Fullcalendar and Realted Plugins
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from "@fullcalendar/interaction"; // needed
import listPlugin from '@fullcalendar/list'; //For List View
import axios from 'axios';
import * as utils from "../utils/utils";

class agenda extends Component  {
    constructor(props){
        super(props)
        this.state = {msg:'',
            agendaBusca: {},
            show: false,
            eventsAgenda:[]
        };
        this.procurarAgenda = this.procurarAgenda.bind(this);
       // this.procurarAgenda()
    }

    procurarAgenda(e) {
        axios.post('/rest/hemocentro/listAgendados',{
            hemocentroId: utils.getCookie(),
            })
            .then(response => {
             console.log(response.data);
             this.setState({agendaBusca: response.data}); 
             this.handleDateSelect();
            //{title: 'Doação: ' || this.state.agendaBusca.nomeDoador, date: this.state.agendaBusca.horarioDoacao}
            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e.response.status);
                console.log(e.response.data.cupom);
        });
    }

    handleDateSelect = () => {
        let title = prompt('Please enter a new title for your event')
    
        if (title) {
            FullCalendar.addEvent({
            title,
            start: '2020-09 -21 12:30:00.0',
          })
        }
      }
        
  render() {
    return (
        <div className="maincontainer">
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin, listPlugin ]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
                }}
                code= 'pt-br'
                buttonText= {{
                    month: 'Mês',
                    week: 'Semana',
                    today: 'Hoje',
                    day: 'Dia',
                    list: 'Lista',
                }}
                weekTex= 'Sm'
                allDayText= 'dia inteiro'
                noEventsText= 'Não há eventos para mostrar'
                weekNumberTitle= 'S'
                editable= 'true'
                //dayClick: function(date)
                locale= 'pt-br'
                selectable= 'true'
                select={this.handleDateSelect}
            />
        </div>
    )
    };
}
export default agenda;