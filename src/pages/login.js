import React from "react";
import axios from "axios";
import './login.css';
import { useState,useEffect } from 'react';
import Navbar from "../Navbar";
import { confirmAlert } from 'react-confirm-alert';
//import 'react-confirm-alert/src/react-confirm-alert.css';
import Cookies from 'universal-cookie';

function Login() {
  //const [token, SetToken] = useState('');
  const cookies=new Cookies();

  const postdata = (data) => {
    //console.log(data);

    axios.post("http://localhost:8080/loginn", data).then(  

      (response) => {
        //success
        cookies.set('token', response.data, { path: '/' });
        //console.log(response, "============");
        console.log("Hiiiiii   ====="+response)
        
        if(response.status===202){
          console.log("data ======="+response.data)
          confirmAlert({//title: response.data.message,
            message: response.data,
            buttons: [
              {
                label: 'OK',
                onClick: () => {
                  window.location.href='/registration';
                }
              }
            ]
          })
        }
        else{

        confirmAlert({//title: response.data.message,
        message: "Login Successfull",
        buttons: [
          {
            label: 'Confirm',
            onClick: () => {
               if(response.status===200){
               window.location.href='/items';
               }
            }
          }
        ]})
      }

      }).catch(error => {

        //error
        console.log("error"+error);
        if(error.response===undefined){
          confirmAlert({title: "Error",
          message: "Unable to fatch database.",
          buttons: [
            {
              label: 'OK',
            }
          ]})
        }
        else{
        confirmAlert({title: "Error",
          message: error.response.data,
          buttons: [
            {
              label: 'OK',
            }
          ]})
        }

      }
    )
  }
  

  const [formError,setFormError]=useState({});
  const [isSubmit,SetIsSubmit]=useState(false);
  const validate=(values)=>{
    const error={};
    const regexEmail= /\S+@\S+\.\S+/;
    const regexPassword= /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
    

    if(!values.email){
      error.email="Email is required";
    }
    else if(!regexEmail.test(values.email)){
      error.email="Email should contains only one @ and . symbols";
    }
    if(!values.password){
      error.password="Password is required";
    }
    else if(!regexPassword.test(values.password)){
      error.password="Password must contains one lower case and one upper case and one special symbol and one number and 10 Characters";
    }
    
    return error;
  }
  const checkError=(formError)=>
  {
    if(formError.email===undefined&&formError.password===undefined){
      return true;
    }
    else{
      return false;
    }
  };

  const [formValues,setFormValues]=useState({
  email:"",
  password:""});

  const submitHandler=(e)=>{
    e.preventDefault();
    setFormError(validate(formValues));
    SetIsSubmit(true);
   
  };

  useEffect(()=>{
    if(isSubmit){
      //console.log(formError);
    }
    if(isSubmit&&checkError(formError)){
      postdata(formValues);
    }
    //console.log(formError);
 
  })

  const handleEmailChange=(e)=>{
    setFormValues({...formValues,email:e.target.value});
    SetIsSubmit(false);
  };
  const handlePasswordChange=(e)=>{
    setFormValues({...formValues,password:e.target.value});
    SetIsSubmit(false);
  };

  return (
    <div className="Apps">
      <header><Navbar/></header>
      <form  onSubmit={submitHandler}>
        <div className="container">
          <div className="header">

            <h1><b>Login</b></h1>

          </div>
          <label className="field"><b>Email : </b></label>
          <input type="email" value={formValues.email}   onChange={handleEmailChange} />
          <p>{formError.email}</p>

          <br></br>

          <label><b>Password : </b></label>
          <input type="password" value={formValues.password}  maxLength={10}  onChange={handlePasswordChange} />
          <p>{formError.password}</p>

          <input type="submit" value="Login" className="button"/>

        </div>
       
      </form>
     
    </div>
  );
}


export default Login;