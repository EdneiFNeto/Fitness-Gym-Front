import React from 'react';
import  { Link } from 'react-router-dom';
import swal from 'sweetalert';

export default function SideBar() {
  function logout() {
    swal({
      title: `Want logout System?`,
      text: "Is action not back!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("id")
        window.location.href = "/"
        
      } else {
        swal({
          title: "Cancel",
          text: "Is count did not DELETE!",
          icon: "warning"});
      }
    });
    
  }

  return (
    <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
      
    <div className="logo">
      <Link to="#" className="simple-text logo-normal">
        <i className="material-icons mr-4">fitness_center</i>
        Fitness Gym
      </Link>
    </div>
    
    <div className="sidebar-wrapper">
      <ul className="nav">
        <li className="nav-item active  ">
          <Link className="nav-link" to="/painel">
               <i className="material-icons">dashboard</i>
              <p>Dashboard</p>
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/students/create">
            <i className="material-icons">people_alt</i>
            <p>Students</p>
          </Link>
        </li>
        <li className="nav-item ">
          <Link className="nav-link" to="/aulas">
            <i className="material-icons">event_note</i>
            <p>Events</p>
          </Link>
        </li>

        <li className="nav-item ">
          <Link className="nav-link" to="/training">
            <i className="material-icons">fitness_center</i>
            <p>training</p>
          </Link>
        </li>

        <li className="nav-item ">
          <Link className="nav-link" to="#" onClick={()=> logout()}>
            <i className="material-icons">logout</i>
            <p>Logout</p>
          </Link>
        </li>
      </ul>
    </div>
  </div>
  )
}