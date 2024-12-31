import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { bookingF, bookVieww, decreaseC } from '../services/allApis';
import { BASEURL } from '../services/baseUrl';
import './main.css';
import Form from 'react-bootstrap/Form';
import StudentNavBar from './StudentNavBar';
import SearchIcon from '@mui/icons-material/Search';
import BookHistoryStudent from './BookHistoryStudent';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Studenthomepage() {

  const [booking,setBooking]=useState()
  const [search,setSearch]=useState('')
  const [sid,setSid]=useState()
  const [books,setBooks]=useState()
  const [refresh,setRefresh]=useState(false)
  const navigate=useNavigate()

  const viewbook=async()=>{
    const result =await bookVieww(search)
    console.log(result)
    setBooks(result.data)

  }

  useEffect(()=>{
    viewbook()
    
  },[search])

 
  
  useEffect(()=>{
    

    const role1= sessionStorage.getItem('role')
    const role=JSON.parse(role1)

 const uid=sessionStorage.getItem('userId')
    
    
    if(role=='student'){
      
    }else{
navigate('/login')
    }
    userIdFunction()
  },[])

useEffect(()=>{
  dates()
},[])

const refreshFunction=()=>{
  setRefresh(true)
}
const decreaseCount=async(id)=>{

  const result=await decreaseC(id)
  console.log(result)

  if(result.status==200){
    toast.success("Book successfully reserved..")
    userIdFunction()
    refreshFunction()
  }else{
    toast.error("Book is not reserved..")
  }
}

const dates=()=>{
  const bookingD= new Date()
  const day=bookingD.getDate()
  const month=bookingD.getMonth()+1
  const year=bookingD.getFullYear()

  setBooking({...booking,bookingDate:`${day}/${month}/${year}`})

  console.log(day,month,year)
}

const userIdFunction=()=>{
  const uid=sessionStorage.getItem('userId')
  const userid=JSON.parse(uid)
  setSid(userid)
}

const reserveFunction=async(item)=>{
console.log(item)

 const dataToSend={
  studentId:sid,
  bookId:item._id,
  bookName:item.title,
  bookingDate:booking.bookingDate
 }

 console.log(dataToSend)
 

  const result=await bookingF(dataToSend)
  console.log(result)

  if(result.status==200){
    decreaseCount(result.data.bookId)
  }
  else if(result.status===201){
    toast.error("Already Reserved")
  }
  else{
    toast.error("Book reservation failed..")
  }
  // if(result.data.status==='pending'){
  //   toast.success("Book successfully reserved..")
  // }else{
  //   toast.error("Book reservation failed..")
  // }
  
}
console.log(booking)
console.log(books)
console.log(search)
console.log(refresh)
  return (
    <>
    <StudentNavBar/>
    <div className='container'>
    
<Form.Control className='search-bar'
        type="text"
        name="key"
        placeholder='search books here'
        id="searchbooks"
        onChange={(e)=>setSearch(e.target.value)}
        
      />
  </div>
  <div className='mb-2'><BookHistoryStudent comp={refresh}/></div>
    <div className='container-fluid'>
 
  <div className='row'>
   
     { books?.map((item)=>(
     <div className='col-4 col-md-3 col-lg-2'> <Card className="card-size shadow mt-2">
     
<img style={{width:'100%', height:'150px'}} src={`${BASEURL}/upload/${item.cover}`} alt="img" />

<Card.Title className='card-title'>{item.title}</Card.Title>
<Card.Body>
  {item.description} 
  
</Card.Body>
{
  item.count==='0'?
   <Button className='btn disabled' variant="danger">Out Of Stock</Button>
  : <Button onClick={()=>reserveFunction(item)}>Reserve</Button>
}

      </Card>
      </div>
))}
</div>
  </div>
    </>
  )
}
