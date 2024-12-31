import React, { useEffect, useState } from 'react'
import Adminsidebar from './Adminsidebar';
import './main.css'
import { viewStudentsByAdmin } from '../services/allApis';
import { Table } from 'react-bootstrap';
import { BASEURL } from '../services/baseUrl';
import { useNavigate } from 'react-router-dom';
import Navbartop from './Navbartop';

function ViewsStudents() {

    const navigate=useNavigate()
    const [students,setStudents]=useState()
    const viewStudents=async()=>{
        const result=await viewStudentsByAdmin()
        console.log(result)
        setStudents(result.data)
    }

useEffect(()=>{
    if(sessionStorage.getItem("token")){
        
    }else{
        navigate('/login')
    }
    viewStudents()
},[])

console.log(students)
  return (
    <div> <Navbartop/> 
    <div className='row'>
         <div className='col-2 bg-sbar'><Adminsidebar/></div>

         <div className='col-10'>
        <div className='modal-ct'> <Table>
            <thead><tr>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Address</th>
                <th>Email</th>
                <th>Profile</th>
                </tr></thead>

                <tbody>
                    {
                        students?.map((item)=>(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.gender}</td>
                                <td>{item.age}</td>
                                <td>{item.address}</td>
                                <td>{item.email}</td>
                                <td><img style={{width:'60px',height:'60px'}} src={`${BASEURL}/upload/${item.profile}`} alt="" /></td>
                            </tr>
                        ))
                    }
                </tbody>
         </Table> </div>
         </div>
    </div> 
    </div>
  )
}

export default ViewsStudents