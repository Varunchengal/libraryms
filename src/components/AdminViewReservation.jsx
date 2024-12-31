import react, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { approveByAdmin, increaseC, reservationViewByAdmin } from '../services/allApis'
import Adminsidebar from './Adminsidebar';
import Button from 'react-bootstrap/Button'
import Navbartop from './Navbartop';
import { toast } from 'react-toastify';

export default function AdminViewReservation(){

    const [view,setView]=useState()

    const viewHistory=async()=>{
        const result=await reservationViewByAdmin()
        console.log(result)
        setView(result.data)
    }

useEffect(()=>{
    viewHistory()
},[])


const increaseCount=async(id)=>{
    const result=await increaseC(id)

    if(result.status===200){
        toast.success("Book Approved Successfully..")
    }else{
        toast.error("Book Approval Failed...")
    }
}

const approval=async(item)=>{
   const status="approved"
    const result2=await approveByAdmin(item)
    console.log(result2)


    if(result2.status===200){
        increaseCount(result2.data.bookId)
    }else{
        toast.error("error...")
    }

    viewHistory()
}

return(
    <div> <Navbartop/>
        <div className='row'>
         <div className='col-2 bg-sbar'>   <div><Adminsidebar/></div></div>
            <div className='col-10' style={{height:'800px', overflowX:'scroll'}}>
        <Table>
            <thead>
                <tr>
                    <th>Book Id</th>
                    <th>Student Id</th>
                    <th>Name</th>
                    <th>B Date</th>
                    <th>R Date</th>
                   
                    <th></th>
                </tr></thead>
                <tbody style={{height:'850px',overflowY:'scroll'}}>
                    {
                       view?.map((item)=>(
                        <tr><td>{item.bookId}</td>
                        <td>{item.studentId}</td>
                        <td>{item.bookName}</td>
                        <td>{item.bookingDate}</td>
                        <td>{item.returnDate}</td>
                        
                        { item.status==="returned" ?
                        <td><Button onClick={()=>approval(item._id)}>Approve</Button></td>
                        : <td className="text-success">{item.status}</td> } 
                         </tr>
                        

))
                    }
                </tbody>

        </Table></div> 
        </div> </div>
)
}