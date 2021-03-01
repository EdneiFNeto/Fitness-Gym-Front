import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import  { Link } from 'react-router-dom';
import swal from 'sweetalert';

import SideBar from '../../sidebar';
import Footer from '../../footer';
import Input from '../../../components/Form/Input';
import { api } from '../../../service/api';
import { swalerror, swalsuccess } from '../../../util/dialog/index';
import { dateActual, convertDate, addMonth } from '../../../util/date/getMonthAndYearUtil';


export default function CreateStudent() {
  const formRef = useRef(null);
  const [payts, setPayts] = useState([]);

  useEffect(() => {

    const getpays = async () =>  {
      await api.get(`/payts`)
        .then((response) => {
          if (response.status === 200) {
            setPayts(response.data);
            formRef.current.setData(response.data);
          }
        })
        .catch((error) => console.log('error', error));
    }

    getpays();

  }, [payts]);

  async function handleSubmit(data, { reset }) {
    try {
      await api.post(`/students`, { ...data })
        .then((response) => {
          if (response.status === 201) {
            swalsuccess('Students created is Success!', false);
            reset();
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`, true));
    } catch (error) {
      console.log('error', error.response);
    }
  }

  const handleDelete = (student) => {
    swal({
      title: `Want to DELETE student the "${student.name}"?`,
      text: "Is action not back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        handleDeleteStudent(student)
      } else {
        swal({
          title: "Cancel",
          text: "Is count did not DELETE!",
          icon: "warning"});
      }
    });
  }

  const handleDeleteStudent = async (student) => {
    await api.delete(`students/${student.id}`)
      .then((response) => {
        if(response.status === 201){
          swalsuccess('Student delete is Success!', false);
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
                        <th className="text-center">Satate paymented</th>
                        <th className="text-center">Register Date</th>
                        <th className="text-center">Add Training</th>
                        <th className="text-right">Delete</th>
                      </thead>

                      <tbody>
                        {
                          payts.length > 0 &&  payts.map((payt, index) => (
                            <tr key={index}>
                              <td className="text-left">{payt.student.id}</td>
                              <td className="text-center">{payt.student.name}</td>
                              <td className="text-center">{payt.student.email}</td>
                              <td className="text-center">
                                <Link to="#">
                                    <i className="material-icons" 
                                      title={payt.state ? `Paymented` : `Did not   pay`}
                                      style={payt.state ? { color: '#558B2F'} : { color: '#b71c1c'}}>{payt.state ? `check_circle` : `info`}</i> 
                                </Link>
                              </td>
                              <td className="text-center">{ `${convertDate(payt.register_date)} - ${addMonth(payt.register_date)}`}</td>

                              <td className="text-center">
                                <Link to={{
                                    pathname: "/students/add-training",
                                    state: { id: payt.student.id }
                                  }} title="Training">
                                    
                                  <i className={`material-icons`}>fitness_center</i>
                                </Link>
                              </td>

                              <td className="text-right">
                                <Link to="#" title="Delete" onClick={()=> handleDelete(payt.student)}>
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
