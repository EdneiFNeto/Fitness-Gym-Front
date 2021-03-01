import React, {  useEffect } from 'react';

import SideBar from '../sidebar';
import Footer from '../footer';
import Calendar from '../../components/calendar'

export default function Aulas(){

  useEffect(() => {
  }, []);

  return(
    <>
      <SideBar />
      <div className="main-panel">
        
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">Events</h4>
                    <p className="card-category">List events to the week</p>
                  </div>

                  <div className="card-body">
                    <Calendar
                      data={[]}
                      defaultCurrentDate={ [] } />
                        
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}