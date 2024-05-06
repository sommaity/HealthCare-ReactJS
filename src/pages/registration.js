
import './registration.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import { confirmAlert } from 'react-confirm-alert';

function Registration() {   
  const postdata = (data) => {
    axios.post("/register", data).then(  
      (response) => {
        //success
        console.log(response);
        if(response.status===201){
          confirmAlert({title: "Registration Successfull",
            message: response.data,
            buttons: [
              {
                label: 'Confirm',
                onClick: () => {
                  window.location.href='/login';
                }
              }
            ]
          })
        }
        else if(response.status===202){
          confirmAlert({//title: response.data.message,
            message: response.data,
            buttons: [
              {
                label: 'OK',
              }
            ]
          })
        }
    
      }, (error) => {
        //error
        //console.log(error);
        console.log(error);
        confirmAlert({title: "Error",
          message: error.message+" Unable to fatch database.",
          buttons: [
            {
              label: 'OK',
            }
          ]
        })
      }
    );
  };

  const submitHandler=(e)=>{
    e.preventDefault();
    setFormError(validate(formValues));
    SetIsSubmit(true);
   
  };
  const [formValues,setFormValues]=useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  });

  const [formError,setFormError]=useState({});
  const [isSubmit,SetIsSubmit]=useState(false);
  const validate=(values)=>{
    const error={};
    const regex=/^[A-Za-z\s]*$/;
    const regexEmail= /\S+@\S+\.\S+/;
    const regexPassword= /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{10,}$/;
    if(!values.firstName){
      error.firstName="First Name is required";
    }
    else if(!regex.test(values.firstName)){
      error.firstName="First Name only contains alphabets";
    }
   
    if(!values.lastName){
      error.lastName="Last Name is required";
    }
    else if(!regex.test(values.lastName)){
      error.lastName="Last Name only contains alphabets";
    }
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

    if(formError.firstName===undefined&&formError.lastName===undefined&&formError.email===undefined&&formError.password===undefined){
      return true;
    }
    else{
      return false;
    }
  };
  const handleFirstNameChange=(e)=>{
    setFormValues({...formValues,firstName:e.target.value});
    SetIsSubmit(false);
  };
  const handleLastNameChange=(e)=>{
    setFormValues({...formValues,lastName:e.target.value});
    SetIsSubmit(false);
  };
  const handleEmailChange=(e)=>{
    setFormValues({...formValues,email:e.target.value});
    SetIsSubmit(false);
  };
  const handlePasswordChange=(e)=>{
    setFormValues({...formValues,password:e.target.value});
    SetIsSubmit(false);
  };
 
  useEffect(()=>{
    if(isSubmit){
      console.log(formError);
    }
    if(isSubmit&&checkError(formError)){
      postdata(formValues);
    }
  })
  
  return (
    <div className='RApp'>
      <header><Navbar/></header>
        <form  onSubmit={submitHandler}>
          <div className="Rcontainer">
            <div className="Rheader"> 
              <h1><b>Registration</b></h1>
            </div>
        
            <label > <b>First Name : </b></label>
            <input type="text" id='Rfirstname' value={formValues.firstname}  onChange={handleFirstNameChange} />
            <p>{formError.firstName}</p>

            <label><b>Last Name : </b></label>
            <input type="text" value={formValues.lastname}  onChange={handleLastNameChange} />
            <p>{formError.lastName}</p>
        
            <label className="Rfield"><b>Email : </b></label>
            <input type="email" value={formValues.email}   onChange={handleEmailChange} />
            <p>{formError.email}</p>

            <label className="Rrfield"><b>Password : </b></label>
            <input type="password" value={formValues.password}  maxLength={10}  onChange={handlePasswordChange} />
            <p>{formError.password}</p>

            <input type="submit" value="Register" className="button"/>
          </div>
        </form>
        <br></br>
      
    </div>
  );
}

export default Registration;