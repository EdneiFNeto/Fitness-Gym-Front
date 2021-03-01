import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import  { Link } from 'react-router-dom';

import SideBar from '../../sidebar';
import Footer from '../../footer';
import Input from '../../../components/Form/Input';
import { api } from '../../../service/api';
import { swalerror, swalsuccess } from '../../../util/dialog/index';
import { dateActual } from '../../../util/date/getMonthAndYearUtil';


export default function CreateStudent() {
  const formRef = useRef(null);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, []);

  async function getStudents() {
    await api.get(`/students`)
      .then((response) => {
        if (response.status === 200) {
          setStudents(response.data);
          formRef.current.setData(response.data);
        }
      })
      .catch((error) => console.log('error', error));
  }

  async function handleSubmit(data, { reset }) {
    try {
      await api.post(`/students`, { ...data })
        .then((response) => {
          if (response.status === 201) {
            swalsuccess('Students created is Success!', false);
            getStudents();
            reset();
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`, true));
    } catch (error) {
      console.log('error', error.response);
    }
  }
  return (
    <>
      <SideBar />
      <div className="main-panel">
        <div className="content">
          <div className="container-fluid">
            <div className="row">

              <div className="col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">Add Students</h4>
                    <p className="card-category">Add stutends to the system</p>
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
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="bmd-label-floating">E-mail</label>
                            <Input name="email" type="text" className="form-control" />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="bmd-label-floating">Register Date</label>
                            <Input name="register_date" type="date" className="form-control" />
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="btn btn-primary pull-right">Add Stutend</button>
                      <div className="clearfix" />
                    </Form>
                  </div>
                </div>
              </div>
            

              <div className="col-lg-12 col-md-12">
                <div className="card">
                  <div className="card-header card-header-primary">
                    <h4 className="card-title">List is Stutends </h4>
                    <p className="card-category">Last register on { dateActual } </p>
                  </div>

                  <div className="card-body table-responsive">
                    
                    <table className="table table-hover">
                      <thead className="text-primary">
                        <th className="text-left">ID</th>
                        <th className="text-center">Name</th>
                        <th className="text-center">E-mail</th>
                        <th className="text-center">Add Training</th>
                        <th className="text-center">Edit</th>
                        <th className="text-right">Delete</th>
                      </thead>

                      <tbody>
                        {
                          students.length > 0 &&  students.map((student, index) => (
                            <tr key={index}>
                              <td className="text-left">{student.id}</td>
                              <td className="text-center">{student.name}</td>
                              <td className="text-center">{student.email}</td>
                              <td className="text-center">
                                <Link to={{
                                    pathname: "/students/add-training",
                                    state: { id: student.id }
                                  }} title="Training">
                                  <i className="material-icons">fitness_center</i>
                                </Link>
                              </td>

                              <td className="text-center">
                                <Link to={{
                                    pathname: "/students/edit",
                                    state: { id: student.id }
                                  }} title="Edit">
                                  <i className="material-icons color-red">edit</i>
                                </Link>
                              </td>

                              <td className="text-right">
                                <Link to="#" title="Delete">
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
  );
}
