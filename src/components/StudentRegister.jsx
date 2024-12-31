import React, { useState } from 'react';
import { Button, FormControl, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Form from 'react-bootstrap/Form';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import './main.css'
import { addUser } from '../services/allApis';
import { toast } from 'react-toastify';

export default function StudentRegister() {

  const [reg,setReg]=useState({})
  const [valName,setValName]=useState(true)
  const [valGen,setValGen]=useState(true)
  const [valAge,setValAge]=useState(true)
  const [valAddress,setValAddress] =useState(true)
  const [valEmail,setValEmail]=useState(true)
  const [valPass,setValPass]=useState(true)

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });
      

      //handler inputs

      const handlerReg=(e)=>{
const {name,value}=e.target

if(name==='name'){
  if(!!value.match(/^[a-zA-Z ]+$/)){
    setReg({...reg,[name]:value})
    setValName(true)
  }else{
    setValName(false)
  }
}else if(name==='gender'){
  if(value){
    setReg({...reg,[name]:value})
    setValGen(true)
  }else{
    setValGen(false)
  }
}else if(name==='age'){
  if(!!value.match(/^[0-9]+$/) && value>0){
    setReg({...reg,[name]:value})
    setValAge(true)
  }else{
    setValAge(false)
  }
}else if(name==='address'){
  if(value){
    setReg({...reg,[name]:value})
    setValAddress(true)
  }else{
    setValAddress(false)
  }
}else if(name==='email'){
  if(!!value.match(/^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,}$/)){
    setReg({...reg,[name]:value})
    setValEmail(true)
  }else{
    setValEmail(false)
  }
}else if(name==='password'){
  if(value){
    setReg({...reg,[name]:value})
    setValPass(true)
  }else{
    setValPass(false)
  }
}
      }



const regClicked=async(e)=>{
  e.preventDefault()

const users=new FormData()
users.append("name",reg.name)
users.append("gender",reg.gender)
users.append("age",reg.age)
users.append("address",reg.address)
users.append("email",reg.email)
users.append("password",reg.password)
users.append("profile",reg.profile)

const header={
  'Content-Type':'multipart/form-data'
}

const result=await addUser(users,header)
console.log(result)

if(result.status==200){
  toast.success("Registration Successfully..")
}else{
  toast.error("Registration Failed...")
}
}
      console.log(reg)
  return (
    <div className='reg-s-align'> 
        <div className='reg-student'>
            <h2 className='pb-3'>Student Register</h2>
            <Form action="">
                <FormControl>
            <TextField id="name" name="name" label="Name" variant="outlined" onChange={(e)=>handlerReg(e)}/>
            {
              !valName && <p className='error'>Enter valid name</p>
            } <br />
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        row
        // defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" name="gender" onChange={(e)=>handlerReg(e)}/>
        <FormControlLabel value="male" control={<Radio />} label="Male" name="gender" onChange={(e)=>handlerReg(e)} />
        <FormControlLabel value="other" control={<Radio />} label="Other" name="gender" onChange={(e)=>handlerReg(e)} />
      </RadioGroup>
      {
              !valGen && <p className='error'>Enter valid gender</p>
            } 
      <br /> <TextField type='text' id="age" name="age" label="Age" variant="outlined" onChange={(e)=>handlerReg(e)}/> 
      {
              !valAge && <p className='error'>Enter valid age</p>
            } <br />
      <TextField id="address" name="address" label="Address" variant="outlined" onChange={(e)=>handlerReg(e)}/> 
      {
              !valAddress && <p className='error'>Enter valid address</p>
            }<br />
      <TextField type='email' id="email" name="email" label="email" variant="outlined" onChange={(e)=>handlerReg(e)}/>
      {
              !valEmail && <p className='error'>Enter valid email</p>
            }
        <br />
      <TextField type='password' id="password" name="password" label="password" variant="outlined" onChange={(e)=>handlerReg(e)}/>
      {
              !valPass && <p className='error'>Enter password</p>
            } <br />
      </FormControl>
<br />
      <Form.Group controlId="formFile" className="mb-5 mt-3">
        <Form.Label></Form.Label>
        <Button className='mb-3'
  component="label"
  role={undefined}
  variant="contained"
  tabIndex={-1}
  startIcon={<CloudUploadIcon />}
>
  Upload Profile
  <VisuallyHiddenInput
    type="file"
    // onChange={(event) => console.log(event.target.files)}
    onChange={(e)=>setReg({...reg,profile:e.target.files[0]})}
    multiple
  />
</Button> <br />
        <Button variant="contained" onClick={(e)=>regClicked(e)}>Register</Button>
      </Form.Group>
            </Form>
        </div>
    </div>
  )
}
