import React, { useRef, useEffect, useState } from 'react';
import { Form } from "@unform/web";
import { Link } from 'react-router-dom';
import swal from 'sweetalert';


import SideBar from '../../sidebar';
import Footer from '../../footer';
import Select from '../../../components/Form/select';
import { api } from '../../../service/api';
import { swalerror, swalsuccess } from '../../../util/dialog/index';
import { dateActual } from '../../../util/date/getMonthAndYearUtil';
import avatarMan  from '../../../assets/avatar-man.png';


export default function AddTrainingStudent (props){
  const formRef = useRef(null);
  const [trainingsStudents, setTrainingStudents] = useState([])
  const [student, setStudent] = useState(undefined);
  const [training, setTraining] = useState([]);
  const repetitions = [
    {value: '1', label: '6 a 8x'},
    {value: '2', label: '8 a 12x'},
  ]
  const series = [
    {value: 'A', label: 'A'},
    {value: 'B', label: 'B'},
    {value: 'C', label: 'C'},
  ]

  useEffect(()=> {

    const getTrainings = async () => {
      api.get('/trainings')
        .then((response)=> {
          if(response.status === 200){
            const arrayTrainings = [];
            response.data.forEach((trainig) => {
              arrayTrainings.push({value: trainig.id, label: `${ trainig.type } - ${ trainig.name }` });
            })
            setTraining(arrayTrainings)
          }
        })
    }

    getTrainings();
  }, [])

  useEffect(()=> {
  
    if(props.location.state !== undefined){
      const state = props.location.state
      const  getStudents = async () => {
        await api.get(`/students/${state.id}`)
        .then((response)=> {
          if(response.status === 200){
            setStudent(response.data)
            formRef.current.setData(response.data)
          }
        })
        .catch((error) => console.log('error', error))
      }
      
      getStudents();
    }

  }, [props.location.state])

  useEffect(() => {

    if(student !== undefined){
      const getTrainingsStudents =  async () => {
        await api.get(`/trainings-students/student/${student.id}`)
          .then((response) => {
            if(response.status === 200){
              setTrainingStudents(response.data);
            }
        })
        .catch((error) => console.log('error', error));
      }
      
      getTrainingsStudents();
    }
  }, [trainingsStudents, student])

  async function handleSubmit(data, { reset }){

    try {
      const request = {
        student_id: student.id, 
        training_id: data.training_id,
        repetitions: data.repetitions,
        series: data.series
      } 

      await api.post(`/trainings-students`, { ...request })
        .then((response)=> {
          if(response.status === 201) {
            swalsuccess('Training added is Success!', false);
            reset();
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }

  const handleDelete = (training) => {
    swal({
      title: `Want to DELETE training the "${training.training.name}"?`,
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
    await api.delete(`trainings-students/${training.id}`)
      .then((response) => {
        if(response.status === 200){
          swalsuccess('Training delete is Success!', false);
        }
      }).catch((error) => {console.log('error')})
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
                            <label className="bmd-label-floating">Add Training</label>
                            <Select
                              name="training_id"
                              options={ training }
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="bmd-label-floating">Repetitions</label>
                            <Select
                              name="repetitions"
                              options={repetitions}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="bmd-label-floating">A/B/C (Série)</label>
                            <Select
                              name="series"
                              options={series}
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
                    <Link to="#">
                      <img className="img" src={ avatarMan } alt="avatar" />
                    </Link>
                  </div>
                  <div className="card-body">
                    {
                      student !== undefined  && (
                        <div>
                          <h4 className="card-title">{student.name}</h4>
                          <p className="card-description">{student.id}</p>
                          <p className="card-description">{student.email}</p>
                          <Link to="#" className="btn btn-primary btn-round">Follow</Link>
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
                        <th className="text-center">Reapet</th>
                        <th className="text-center">Séries</th>
                        <th className="text-right">Delete</th>
                      </thead>

                      <tbody>
                        {
                          trainingsStudents.length > 0 &&  trainingsStudents.map((trainingStudents, index) => (
                            <tr key={index}>
                              <td className="text-left">  {trainingStudents.id}</td>
                              <td className="text-center">{trainingStudents.training.name}</td>
                              <td className="text-center">{trainingStudents.training.type}</td>
                              <td className="text-center">{trainingStudents.repetitions}</td>
                              <td className="text-center">{trainingStudents.series}</td>
                              <td className="text-right">
                                <Link to="#" title="Delete" onClick={()=> handleDelete(trainingStudents)}>
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