import './InventoryItems.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from "../Navbar";
import { confirmAlert } from 'react-confirm-alert';

function InventoryItems(){
    const[dataJson,setDataJson]=useState([]);
    useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + document.cookie.substring(6);
        //console.log("cookies "+document.cookie.substring(6));
        axios.get('http://localhost:8080/allitems').then(response=>{
            console.log(response.data);
            console.log("status "+response.status);
            setDataJson(response.data);
        })
        .catch(error=>{
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
    },[])
    if(dataJson!==undefined){
    return(
        <div className='table_quantity'>
            <header><Navbar/></header>
            <h2>Inventory Levels</h2>
            <table>
            <thead>
                
                <tr>
                    <th> ItemID </th>
                    <th> ItemName </th>
                    <th> Description </th>
                    <th> QuantityAvailable </th>
                    <th> ReorderThreshold </th>
                    <th> UnitPrice </th>
                </tr>
                </thead>
                <tbody>
                            
                            {dataJson.map((obj,index)=>(
                                <tr key={index}>
                                    <td>{obj.id}</td>
                                    <td>{obj.itemName}</td>
                                    <td>{obj.description}</td>
                                    <td>{obj.quantityAvailable}</td>
                                    <td>{obj.reorderThreshold}</td>
                                    <td>{obj.unitPrice}</td>
                                    

                                </tr>
                                ) 
                            )}
                        
                        </tbody>
            
            </table>


        </div>

    )}
    else{
        return (
            <div className='table_quantity'>
                <header><Navbar/></header>
            </div>
        );
    }

}

export default InventoryItems;