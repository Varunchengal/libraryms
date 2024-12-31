import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { mailCheck } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Forgotpassword() {
    const [email,setEmail]=useState({})
const navigate=useNavigate()
    const checkEmail=async(e)=>{
        e.preventDefault()

        const result= await mailCheck(email)
        console.log(result)

        if(result.status===200){
            sessionStorage.setItem("user",JSON.stringify(result.data._id))
            navigate('/change')
        }else{
          toast.error("Email not found")
        }
    }

  return (
    <div>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e)=>setEmail({...email,email:e.target.value})}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
           </Form>
       
          <Button variant="secondary" >
           Clear
          </Button>
          <Button variant="primary" onClick={(e)=>checkEmail(e)}>
           Next
          </Button>
        
    

    </div>
  )
}
