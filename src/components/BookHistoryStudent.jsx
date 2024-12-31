import React,{useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { Table } from 'react-bootstrap';
import { returnBook, viewHistoryBook } from '../services/allApis';
import './main.css'

export default function BookHistoryStudent({comp}) {

     const [show, setShow] = useState(false);
    
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);
        const [booksHistory,setBooksHistory]=useState()
        const [retBook,setRetBook]=useState()

     

const viewBookH=async(sid)=>{
  if(sessionStorage.getItem('userId')){
   const uid= sessionStorage.getItem('userId')
    const id=JSON.parse(uid)
  console.log(id)
    const result=await viewHistoryBook(id)
    console.log(result)
    setBooksHistory(result.data)
  }
}
    

useEffect(()=>{
  viewBookH()
},[comp])

useEffect(()=>{
  dates()
},[])

const dates=()=>{
  const rDate=new Date()
const date=rDate.getDate()
const month =rDate.getMonth()+1
const year=rDate.getFullYear()
setRetBook({
  returnDate:`${date}/${month}/${year}`
  
})
}

const returnClikced=async(item)=>{
const bookid=item._id

dates()


const result=await returnBook(bookid,retBook)
console.log(result)

viewBookH()
}

  return (
    <div>
        <div>
        <Button variant="primary" onClick={handleShow}>
        View History
      </Button>
        <Modal className='modal-xl modal-ct'  show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>History</Modal.Title>
        </Modal.Header>
        <Modal.Body className='modal-ct'>
            <Table>
                <thead>
                    <tr>
                        <th>Book id</th>
                        <th>Name</th>
                        <th>Booking date</th>
                        <th>Return date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                  {
                    booksHistory?.map((item)=>(
                      <tr><td>{item._id}</td>
                      <td>{item.bookName}</td>
                      <td>{item.bookingDate}</td>
                      <td>{item.returnDate}</td>
                      <td>{ !item.returnDate && (<Button onClick={()=>returnClikced(item)}>Return</Button>)}</td></tr>
                    ))
                  }
                </tbody>
            </Table>
        </Modal.Body>
         </Modal>
        </div>
    </div>
  )
}
