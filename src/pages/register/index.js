import React, { useRef } from "react";
import  { Link } from 'react-router-dom';
import { api } from '../../service/api';

import { Form } from "@unform/web";
import Input from '../../components/Form/Input';
import { swalerror, swalsuccessredirect } from '../../util/dialog/index'

function Register() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try {
      await api.post("/users", { ...data })
        .then((response)=> {
          if(response.status === 201) {
            swalsuccessredirect("Success register user", true, '/')
            reset();
          }
        })
        .catch((error) => swalerror(`${error.response.data.error}`,  true))
    } catch (error) {
      console.log('error', error.response)
    }
  }


  return <>
    <div className="page">
      <div className="main">
        <div className="main-wrapper">
          <div className="login-methods">
            <div className="login-methods-signup text-gold btn-gray ">
              <Link to="/" className="btn btn-link "> Back </Link>
            </div>
          </div>
          
          <Form onSubmit={handleSubmit} ref={formRef}>
            <div className="form-body">
                <Input name="name" className="input" type="text" 
                  placeholder="Name Profile" />
                
                <Input name="email" className="input" type="email" 
                  placeholder="E-mail" />
                
                <Input name="password" className="input" type="password"
                  placeholder="Password" />
              <button type="submit">Register</button>
            </div>


            <div className="form-message">
              <div className="form-message-title">
                <h1>Register</h1>
              </div>
              <div className="form-message-body">
                <h3>Register your profile and of Team</h3>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </>
}

export default Register;