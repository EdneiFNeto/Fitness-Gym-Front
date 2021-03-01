import React, { useRef } from 'react';

import { Form } from '@unform/web';
import { Modal } from 'react-bootstrap';

import Input from '../../components/Form/Input';
import Select from '../../components/Form/select';
import { api } from '../../service/api';
import { swalerror, swalsuccess } from '../../util/dialog/index';

export default function ModalTraininig(props){
  const formRef = useRef(null);
  const types = [
    {value: 'Peito', label: 'Peito'},
    {value: 'Biceps', label: 'Biceps'},
    {value: 'Trices', label: 'Trices'},
    {value: 'Ombro', label: 'Ombro'},
    {value: 'Pernas', label: 'Pernas'},
    {value: 'Gluteo', label: 'Gluteo'},
    {value: 'Dorsal', label: 'Dorsal'},
  ];

  async function handleSubmit(data, { reset }) {
    try {
      await api.post(`/trainings`, { ...data })
        .then((response) => {
          if (response.status === 201) {
            swalsuccess('training created is Success!', false);
            reset();
            props.getTraining();
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`, true));
    } catch (error) {
      console.log('error', error.response);
    }
  }

  return(
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit} ref={formRef}>
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">Add Training</h4>
                    <p className="card-category">Add types trinin to the System</p>
                  </div>
                  <div className="card-body">
                      <div className="row">
                        
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="bmd-label-floating">Type</label>
                            <Select
                              name="type"
                              options={ types }
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="bmd-label-floating">Name</label>
                            <Input name="name" type="text" className="form-control" />
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary btn-block">Add Training</button>
                      <div className="clearfix" />
                  </div>
                </div>
              </div>
            </Form> 
        </Modal.Body>
      </Modal>
  )
}