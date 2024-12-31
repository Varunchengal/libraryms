import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { logUser } from '../services/allApis';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

export default function Loginpage() {

 const navigate=useNavigate()

    const [log,setLog]=useState({})
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


// const logHandler=(e)=>{
// const [name,value]=e.target 
//     }

const logClicked=async(e)=>{
    e.preventDefault()

    const result=await logUser(log)
    console.log(result)

    if(result.status===200){
     

        toast.success("Login successfull..")

        if(result.data.role=='admin'){
          sessionStorage.setItem("userId",JSON.stringify(result.data.user._id))
          sessionStorage.setItem("role",JSON.stringify(result.data.role))
          sessionStorage.setItem("token",JSON.stringify(result.data.token))
        navigate('/admin')
        }else{
          sessionStorage.setItem("userId",JSON.stringify(result.data.user._id))
          sessionStorage.setItem("role",JSON.stringify(result.data.role))
          navigate('/student')
        }
    }else{
        toast.error("Incorrect mail or password")
    }
}

console.log(log)

  return (
    <div>

<Button variant="primary" onClick={handleShow}>
        Login
      </Button>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
              onChange={(e)=>setLog({...log,email:e.target.value})}
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
              onChange={(e)=>setLog({...log,password:e.target.value})}
                type="password"
                placeholder="password"
                autoFocus
              />
            </Form.Group>
            <Link to={'/forgot'}>forgot password</Link>
            <Link className='ps-4 text-secondary' to={'/reg'}>new account</Link>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>logClicked(e)}>
           Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}





