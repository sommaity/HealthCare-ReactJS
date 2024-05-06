import './InventoryItems.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar";
import { confirmAlert } from 'react-confirm-alert';

const array=[];
const CreateOrder= ()=>{
    
    const [isSubmitted,setSubmit]=useState(false)
    class NewOrder{
        constructor(productId,quantity){
            this.productId=productId;
            this.quantity=quantity;
        }
    }
    const[dataJson,setDataJson]=useState([]);
    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + document.cookie.substring(6);
        axios.get('/allitems').then(response=>{
           setDataJson(response.data);
        }).catch(error=>{
            console.log("Error "+error);
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
        })
    },[isSubmitted])
    const handleInputChange=  (index,event)=>{
        const {value}=event.target;
        var productId=0;
        productId= dataJson[index].id;
        var temp=new NewOrder(productId,value);
        array[index]=temp;
        
    }
    const submitHandler=(e)=>{
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + document.cookie.substring(6);   
        axios.post("https://health-app.azurewebsites.net/createorder", array).then(  
            (response) => {
              confirmAlert({//title: response.data.message,
                message: response.data,
                buttons: [
                  {
                    label: 'OK',
                    onClick: () => {
                        //window.location.href='/order';
                        if(response.data.includes('Order is created')){
                            setSubmit((prevState)=>{
                                return !prevState;
                            })
                            window.location.href='/order';
                          }
                     }

                  }
                ]})
              
              
            }, (error) => {
              console.log(error);
              //alert("Unable to send data to database");
            }
            
        );
        setSubmit(true);
    }

    if(dataJson!==undefined){
        return (
            <div className='table_quantity'>
                <header><Navbar/></header>
                <form  onSubmit={submitHandler}>
                    
                    <table border={1}>
                        <thead>
                            <tr>
                                <th> ItemName </th>
                                <th> Description </th>
                                <th> QuantityAvailable </th>
                                <th> UnitPrice </th>
                                <th> Order Quantity </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {dataJson.map((obj,index)=>(
                                <tr key={index}>
                                    <td>{obj.itemName}</td>
                                    <td>{obj.description}</td>
                                    <td>{obj.quantityAvailable}</td>
                                    <td>{obj.unitPrice}</td>
                                    <td><input type="number" name="quantity" min="0" max="999" onChange={(event)=>handleInputChange(index,event)} /></td>

                                </tr>
                                ) 
                            )}
                        
                        </tbody>
                    </table>
                    <input type="submit" value="Submit" className="button"/>
                </form>
            </div>
        );
    }
    else{
        return (
            <div className='table_quantity'>
                <header><Navbar/></header>
            </div>
        );
    }
}

export default CreateOrder;