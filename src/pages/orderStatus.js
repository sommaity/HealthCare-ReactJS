import './InventoryItems.css';
//import { useState,useEffect } from 'react';
import Navbar from "../Navbar";
import axios from 'axios';
import { useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';

function OrderStatus (){
  useEffect(()=>{
   postdata()
  },[])
    const postdata = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + document.cookie.substring(6); 
        axios.post("https://health-app.azurewebsites.net/order").then(response => {
            console.log(response);
            console.log(response.data);
            document.getElementById("demo2").innerHTML="Your Order Status";
            document.getElementById("demo").innerHTML="Your Order Id is: "+response.data.id+"<br></br>Provider Id: "+response.data.providerId+"<br></br>Order Date: "+response.data.orderDate+"<br></br>Order Status: "+response.data.status;
        
          }).catch(error=> {
            console.log("Error: "+error);
            confirmAlert({//title: response.data.message,
              message: 'Unable to fatch Database! Login Again!',
              buttons: [
                {
                  label: 'OK',
                  onClick: () => {
                      window.location.href='/login';
                  }
                }
              ]
            })
          });

    
        }

    return(
        <div className='Apps'>
          <header><Navbar/></header>
           <div className='Rcontainer'>
            <h2 id='demo2'> </h2>
            <br/>
            <p id="demo"></p>
          </div>
        </div>

    );

}
export default OrderStatus;