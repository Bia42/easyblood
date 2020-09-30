import React from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { INITIAL, createEventId } from './event-utils';
import * as utils from "../utils/utils";
import axios from 'axios';

console.log(INITIAL)

export default class DemoApp extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            weekendsVisible: true,
            currentEvents: [],
            usersAgenda: [],
            INITIAL_EVENTS: [],
            some: ''
        }
        this.procurarAgenda = this.procurarAgenda.bind(this);
        this.handleEventsAgenda = this.handleEventsAgenda.bind(this);

        this.procurarAgenda();
    }

    procurarAgenda(e) {
        axios.post('/rest/hemocentro/listAgendados',{
            hemocentroId: utils.getCookie(),
            })
            .then(response => {
             console.log(response.data);
             this.setState({usersAgenda: response.data});
            })
            .catch(e=> {
             // console.log("e.resp:");
                 console.log(e.response.status);
        });    

        setTimeout(() => {
            this.setState({
                INITIAL_EVENTS: this.handleEventsAgenda()        
            })
            console.log(this.state.INITIAL_EVENTS)
        }, 6000); 
    }

  render() {
    return (
      <div className='demo-app'>
        {this.renderSidebar()}
        <div className='demo-app-main'>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
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
            initialView='dayGridMonth'
            locale='pt-br'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={this.state.weekendsVisible}
            events={this.state.INITIAL_EVENTS}
            select={this.handleDateSelect}
            eventContent={renderEventContent} // custom render function
            eventClick={this.handleEventClick}
            eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
          />
        </div>
      </div>
    )
  }

  renderSidebar() {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>Instruções</h2>
          <ul>
            <li>Selecione as datas e você será solicitado a criar um novo evento</li>
            <li>Arraste, solte e redimensione eventos</li>
            <li>Clique em um evento para excluí-lo</li>
          </ul>
        </div>
        <div className='demo-app-sidebar-section'>
          <label>
            <input
              type='checkbox'
              checked={this.state.weekendsVisible}
              onChange={this.handleWeekendsToggle}
            ></input>
            Alternar fins de semana
          </label>
        </div>
        <div className='demo-app-sidebar-section'>
          <h2>Todos os eventos ({this.state.usersAgenda.length})</h2>
          <ul>
            {this.state.usersAgenda.map(this.renderAgendaEvent)}
          </ul>
        </div>
      </div>
    )
  }

  handleWeekendsToggle = () => {
    this.setState({
      weekendsVisible: !this.state.weekendsVisible
    })
  }

  handleDateSelect = (selectInfo) => {
    let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect() // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }
  }

  handleEventClick = (clickInfo) => {
    if (prompt(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  handleEventsAgenda = () => {    
    return(    
        this.state.usersAgenda.map(usersAgenda =>(             
                {
                title: usersAgenda.nomeDoador,
                start: usersAgenda.horarioDoacao
                }
            ))
        )
    }

  handleEvents = (events) => {
    this.setState({
      currentEvents: events
    })
  }

  renderAgendaEvent = (event) => {
        return (
            <li key={event.agendaId}>
            <b>{formatDate(event.horarioDoacao, {year: 'numeric', month: 'short', day: 'numeric'})}</b>
            <i>{event.nomeDoador}</i>
            </li>
        )
    }
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}