import React, { useRef, useEffect, useState } from 'react';
import { Form } from "@unform/web";
import { Link } from 'react-router-dom';

import SideBar from '../../sidebar';
import Footer from '../../footer';
import Input from '../../../components/Form/Input';
import Select from '../../../components/Form/select';
import { api } from '../../../service/api';
import { swalerror, swalsuccess } from '../../../util/dialog/index';
import { dateActual } from '../../../util/date/getMonthAndYearUtil';
import avatarMan  from '../../../assets/avatar-man.png';
import avatarWoman  from '../../../assets/avatar-woman.png';


export default function AddTrainingStudent (){
  const formRef = useRef(null);
  const [trainingsStudents, setTrainingStudents] = useState([])
  const [users, setUsers] = useState(undefined);
  const [training, setTraining] = useState([ 
    {value: '1', label: 'Biceps - Rosca'}
  ]);
  const repetitions = [
    {value: '1', label: '6 a 8x'},
    {value: '2', label: '8 a 12x'},
  ]
  const types = [
    {value: 'A', label: 'A'},
    {value: 'B', label: 'B'},
    {value: 'C', label: 'C'},
  ]


  useEffect(()=> {
    getStudents()
  }, [])

  async function getStudents(){
    
    await api.get(`/students/51f20866-f44b-4e21-8e90-adbb8ed3fde1`)
      .then((response)=> {
        if(response.status === 200){
          setUsers(response.data)
          formRef.current.setData(response.data)
        }
      })
      .catch((error) => console.log('error', error))
  }


  async function handleSubmit(data){
    try {
      const id = users.id
      await api.put(`/students/${id}`, { ...data })
        .then((response)=> {
          if(response.status === 204) {
            swalsuccess('Update User is Success!', false);
            getStudents();
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }

  
  return(
    <>
      <SideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-8">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">Add Training to the Student</h4>
                    <p className="card-category">Complete your training to the student</p>
                  </div>
                  <div className="card-body">
                    <Form onSubmit={handleSubmit} ref={formRef}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="bmd-label-floating">Name</label>
                            <Input name="name" type="text" className="form-control" />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="bmd-label-floating">E-mail</label>
                            <Input name="email" type="text" className="form-control" />
                            
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">Add Training</label>
                            <Select
                              name="training"
                              options={training}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">Repetitioins</label>
                            <Select
                              name="training"
                              options={repetitions}
                            />
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="form-group">
                            <label className="bmd-label-floating">A/B/C (Série)</label>
                            <Select
                              name="types"
                              options={types}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <button type="submit" className="btn btn-primary pull-right">Save Student</button>
                      <div className="clearfix"></div>
                    </Form>
                  </div>
                </div>
              </div>
              
              <div className="col-md-4">
                <div className="card card-profile">
                  <div className="card-avatar">
                    <a href="javascript:;">
                      <img className="img" src={ avatarMan } />
                    </a>
                  </div>
                  <div className="card-body">
                    {
                      users !== undefined  && (
                        <div>
                          <h4 className="card-title">{users.name}</h4>
                          <p className="card-description">{users.email}</p>
                          <a href="javascript:;" className="btn btn-primary btn-round">Follow</a>
                        </div>
                      )
                    }

                  </div>
                </div>
              </div>
           
              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">List is Training Student </h4>
                    <p className="card-category">Last register on { dateActual } </p>
                  </div>

                  <div className="card-body table-responsive">
                    
                    <table className="table table-hover">
                      <thead className="text-primary">
                        <th className="text-left">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Training</th>
                        <th className="text-center">Série</th>
                        <th className="text-right">Delete</th>
                      </thead>

                      <tbody>
                        {
                          trainingsStudents.length > 0 &&  trainingsStudents.map((training, index) => (
                            <tr key={index}>
                              <td className="text-left">{training.id}</td>
                              <td className="text-center">{training.name}</td>
                              <td className="text-center">{training.training}</td>
                              <td className="text-center">{training.serie}</td>
                              <td className="text-right">
                                <Link to="#" title="Delete" onClick={()=> console.log()}>
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
            </div>
          </div>
        <Footer />
      </div>
    </>
  )
}