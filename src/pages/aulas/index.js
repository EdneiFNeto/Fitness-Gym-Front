import React, {  useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import SideBar from '../sidebar';
import Footer from '../footer';
import Calendar from '../../components/calendar';

import { api } from '../../service/api';
import { currentDate } from '../../util/date/getMonthAndYearUtil';
import ModalAddEvents from './modal-add-events';

export default function Aulas(){

  const [schedulerData, setSchedulerData] = useState([]);
  const [show, setShow] = useState(false);
  const formateDate = (date) => format(new Date(date), "yyyy-MM-dd HH:mm")
  
  useEffect(() => {
    getEvents();
  }, [schedulerData]);

  const getEvents = async () => {
    await api.get('/events')
      .then((response) => {
        if(response.status === 200) {
          const arrayEvents = [];

          response.data.forEach((element, index) => {
            arrayEvents.push({ 
              startDate: formateDate(element.start_date), 
              endDate: formateDate(element.end_date), 
              title: element.name,
              id: index 
            })
          });
          
          setSchedulerData(arrayEvents);
        }
      })
      .catch((error) => console.log('error', error))
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <SideBar />
      <div className="main-panel">
        
        <div className="content">
          <div className="container-fluid">
            <div className="row">
                          
              <div className="col-sm-12">
                <Link to="#" className="btn btn-primary float-right" onClick={ handleShow }>
                  <i className="material-icons">event_note</i>
                  {" "} Add Events
                </Link>
              </div>

              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">Events</h4>
                    <p className="card-category">List events to the week</p>
                  </div>

                  <div className="card-body">
                    <Calendar
                      data={schedulerData}
                      defaultCurrentDate={ currentDate }
                    />
                        
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <Footer />
      </div>
      
      <ModalAddEvents
        show={show}
        handleClose={ handleClose }
        getEvents= { getEvents } />
    </>
  )
}