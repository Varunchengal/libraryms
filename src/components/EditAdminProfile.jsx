import React, { useEffect, useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import Form from 'react-bootstrap/Form';
import './main.css'
import { toast } from 'react-toastify';
import Adminsidebar from './Adminsidebar'
import { adminView, editAdminProfile } from '../services/allApis';
import { BASEURL } from '../services/baseUrl';
import Navbartop from './Navbartop'

export default function EditAdminProfile() {

    const [edit,setEdit]=useState({})
    const [valName,setValName]=useState(true)
    const [valGen,setValGen]=useState(true)
    const [valAge,setValAge]=useState(true)
    const [valAddress,setValAddress] =useState(true)
    const [valEmail,setValEmail]=useState(true)
    const [valPass,setValPass]=useState(true)
    const [adminv,setAdminv]=useState({})
    const [preview,setPreview]=useState()

    const viewAdmin=async()=>{
    if(sessionStorage.getItem('userId')){
      const uId= sessionStorage.getItem("userId")
      const userId=JSON.parse(uId)

      const result=await adminView(userId)
      console.log(result)
      setAdminv(result.data)

      setEdit(result.data)
    }
  }

  useEffect(()=>{
    const tok=sessionStorage.getItem("token")
    if(adminv.profile !== edit.profile){
      setPreview(URL.createObjectURL(edit.profile))
    }
  },[edit.profile])

  useEffect(()=>{
    viewAdmin()
  },[])


const editAdmin=(e)=>{
        const {name,value}=e.target
        
        if(name==='name'){
          if(!!value.match(/^[a-zA-Z ]+$/)){
            setEdit({...edit,[name]:value})
            setValName(true)
          }else{
            setValName(false)
          }
        }else if(name==='gender'){
          if(value){
            setEdit({...edit,[name]:value})
            setValGen(true)
          }else{
            setValGen(false)
          }
        }else if(name==='age'){
          if(!!value.match(/^[0-9]+$/) && value>0){
            setEdit({...edit,[name]:value})
            setValAge(true)
          }else{
            setValAge(false)
          }
        }else if(name==='address'){
          if(value){
            setEdit({...edit,[name]:value})
            setValAddress(true)
          }else{
            setValAddress(false)
          }
        }else if(name==='email'){
          if(!!value.match(/^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,}$/)){
            setEdit({...edit,[name]:value})
            setValEmail(true)
          }else{
            setValEmail(false)
          }
        }else if(name==='password'){
          if(value){
            setEdit({...edit,[name]:value})
            setValPass(true)
          }else{
            setValPass(false)
          }
        }
              }
        
const saveClicked=async()=>{
    if(edit.name && edit.email && edit.password && sessionStorage.getItem("token")){

      const tok=sessionStorage.getItem("token")
      const token=JSON.parse(tok)
      console.log(token)

      const admin=new FormData()
      admin.append("name",edit.name)
      admin.append("gender",edit.gender)
      admin.append("age",edit.age)
      admin.append("address",edit.address)
      admin.append("email",edit.email)
      admin.append("password",edit.password)
      admin.append("profile",edit.profile)
      admin.append("isadmin",adminv.isAdmin)
      console.log(admin)

      const headers={
        'Content-Type':'multipart/form-data', 'Authorization':` Bearer ${token}`
      }
        const result= await editAdminProfile(adminv._id,admin,headers)
        console.log(result)

        if(result.status===200){
          toast.success("Succesfully Edited")
          viewAdmin()
        }else{
          toast.error("Editing failed")
        }
    }
}

console.log(adminv)
console.log(edit)
  return (
    <>
    <Navbartop/>
        <div> <Form>
    <div className='row'>
         <div className='col-3 col-md-2 bg-sbar'><Adminsidebar/></div>
    
    <div className='col-3 col-md-3 edit-center'>
    
            <label htmlFor="cover">
              <input type="file" style={{display:'none'}} name="cover" id="cover"
              onChange={(e)=>setEdit({...edit,profile:e.target.files[0]})} />
            { 
              preview? ( <img className="upload" src={preview} alt="cover" />)
              :
              (<img className="upload" src={`${BASEURL}/upload/${adminv.profile}`} alt="co" /> )
            }  
            </label> <br />
            </div>
            <div className="col-5">
            <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control 
              onChange={(e)=>editAdmin(e)}
                type="text"
                defaultValue={adminv.name}
                placeholder="your name"
                name="name"
                autoFocus
               
              />
            </Form.Group>
            
            <Form.Group>
            <Form.Label>Gender</Form.Label> <br/>
            <Form.Check
            inline
            label="Female"
            name="gender"
            value="female"
            type='radio'
            id="gender"
            checked={edit.gender==='female'}
            onChange={(e)=>editAdmin(e)}
          />
            <Form.Check
            inline
            label="Male"
            name="gender"
            value="male"
            type='radio'
            id="gender"
            checked={edit.gender==='male'}
            onChange={(e)=>editAdmin(e)}
          />
            <Form.Check
           inline
            label="Other"
            name="gender"
            value="other"
            type='radio'
            id="gender"
            checked={edit.gender==='other'}
            onChange={(e)=>editAdmin(e)}
          />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Age</Form.Label>
              <Form.Control
              // onChange={(e)=>setBookEdited({...bookEdited,description:e.target.value})}
                type="number"
                placeholder="your age"
                name="age"
                defaultValue={adminv.age}
                onChange={(e)=>editAdmin(e)}
                autoFocus
              />
            </Form.Group>


            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Address</Form.Label>
              <Form.Control 
              // onChange={(e)=>setBookEdited({...bookEdited,author:e.target.value})}
                defaultValue={adminv.address}
                as="textarea"
                name="address"
                placeholder="your address"
                onChange={(e)=>editAdmin(e)}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              name="email"
              // onChange={(e)=>setBookEdited({...bookEdited,count:e.target.value})}
                defaultValue={adminv.email}
                type="email"
                placeholder="your email"
                onChange={(e)=>editAdmin(e)}
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              name="password"
              // onChange={(e)=>setBookEdited({...bookEdited,count:e.target.value})}
                defaultValue={adminv.password}
                type="password"
                placeholder="password"
                onChange={(e)=>editAdmin(e)}
                autoFocus
              />
            </Form.Group>

<Button className="btn btn-primary" onClick={saveClicked}>Save</Button>
         </div>
      
          </div>
          </Form>
          </div>
          </>

    
  )
}
