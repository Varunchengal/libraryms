import { Category } from '@mui/icons-material';
import react, { useEffect, useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { bookViews, bookVieww } from '../services/allApis';
import Adminsidebar from './Adminsidebar';
import Editbook from './Editbook';
import { BASEURL } from '../services/baseUrl';
import Deletebook from './Deletebook';
import Navbartop from './Navbartop';



export default function BookviewAdmin(){
    
  const [bookView,setBookView]=useState([])

const viewBook=async()=>{
  const result=await bookViews()
  console.log(result)

  setBookView(result.data)
}

useEffect(()=>{
viewBook()
},[bookView])

console.log(bookView)
    return(
      <>
      <Navbartop/>
      <div className='row'> 
           <div className='col-2 bg-sbar'><Adminsidebar/></div>
        <div className='col-10'>
          <div className='modal-ct'>
           <Table>
          
            <thead><tr><th>Title</th>
            <th>Description</th>
            <th>Cover</th>
            <th>Author</th>
            <th>Count</th>
            <th>Category</th>
            <th></th>
            <th></th>
            </tr></thead><tbody>
            { bookView?.map((item)=>(
              <tr>
                <td>{item.title}</td>
              <td>{item.description}</td>
              <td><img style={{width:'50px', height:'50px'}} src={`${BASEURL}/upload/${item.cover}`} alt="" /></td>
              <td>{item.author}</td>
              <td>{item.count}</td>
              <td>{item.category}</td>
              <td><Editbook books={item}/></td>
              <td><Deletebook id={item._id}/></td></tr>
            ))}

            </tbody>
           </Table> </div>
        </div></div>
        </>
    )
}