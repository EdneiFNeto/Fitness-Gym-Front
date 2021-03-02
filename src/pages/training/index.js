import React, {  useEffect, useState } from 'react';
import swal from 'sweetalert';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import { api } from '../../service/api';
import { dateActual } from '../../util/date/getMonthAndYearUtil';
import SideBar from '../sidebar';
import Footer from '../footer';
import ModalTraininig from './modal-training';
import { swalerror, swalsuccess } from '../../util/dialog/index';

export default function Training() {
  const [trainings, setTraining] = useState([]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    getTraining();
  }, []);

  async function getTraining() {
    await api.get(`/trainings`)
    .then((response) => {
      if (response.status === 200) {
        setTraining(response.data);
        handleClose();
      }
    })
    .catch((error) => swalerror(`${error.response.data.error}`, true));
  }


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (training) => {
    swal({
      title: `Want to DELETE training the "${training.name}"?`,
      text: "Is action not back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handleDeleteTraining(training)
      } else {
        swal({
          title: "Cancel",
          text: "Is count did not DELETE!",
          icon: "warning"});
      }
    });
  }

  const handleDeleteTraining = async (training) => {
    await api.delete(`trainings/${training.id}`)
      .then((response) => {
        if(response.status === 200){
          swalsuccess('Training delete is Success!', false);
        }
      }).catch((error) => {console.log('error')})
  }

  return (
    <>
      <SideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">List is Training </h4>
                    <p className="card-category">Last register on { dateActual } </p>
                  </div>

                  <div className="card-body table-responsive">
                    
                    <table className="table table-hover">
                      <thead className="text-primary">
                        <th className="text-left">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Training</th>
                        <th className="text-right">Delete</th>
                      </thead>

                      <tbody>
                        {
                          trainings.length > 0 &&  trainings.map((training, index) => (
                            <tr key={index}>
                              <td className="text-left">{training.id}</td>
                              <td className="text-center">{training.name}</td>
                              <td className="text-center">{training.type}</td>
                              <td className="text-right">
                                <Link to="#" title="Delete" onClick={()=> handleDelete(training)}>
                                  <i className="material-icons">delete</i>
                                </Link>
                              </td>
                            </tr>
                          ))
                        }
                      </tbody>

                    </table>
                  
                  </div>
                </div>
              </div>
            </div>
          
            <Button variant="flat" size="xxl" className="float-right btn btn-primary" onClick={ handleShow }>
              Add Training
            </Button>

          </div>
        </div>


        <ModalTraininig
          show={show}
          handleClose={ handleClose }
          getTraining={ getTraining } 
          />

        <Footer />
      </div>
    </>
  );
}
