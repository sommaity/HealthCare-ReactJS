import Navbar from "../Navbar";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import React from "react";
import Cookies from 'universal-cookie';
import {useEffect } from 'react';


const Logout=()=>{
  useEffect(()=>{
    const cookies=new Cookies();
    confirmAlert({
      title: 'Confirm to Logout',
      message: 'Are you sure to Logout.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            cookies.remove('token');
            localStorage.removeItem('token');
            window.location.href='/login';
            console.log("Yes")
          }
        },
        {
          label: 'No',
          onClick: () => alert('Logout unsuccessful')
        }
      ]
    });
  },[])
  return(
    <div className='Apps'>
    
      <header><Navbar/></header>
    </div>
  );
}

export default Logout;