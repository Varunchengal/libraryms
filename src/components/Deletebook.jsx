import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { bookDel } from '../services/allApis';
import { toast } from 'react-toastify';

export default function Deletebook({id}) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

const delClicked=async()=>{

    if(sessionStorage.getItem("token")){
        const tok=sessionStorage.getItem("token")
        const token=JSON.parse(tok)
    const headers={
        'Content-Type': 'multipart/form-data', 'Authorization' : `Bearer ${token}`
    }
    const result=await bookDel(id,headers)
    console.log(result)
    if(result.status===200){
        toast.success("Book deleted successfully..")
        handleClose()
    }else{
        toast.error("Book deletion failed..")
        handleClose()
    }
}
}
  return (
    <div>
<Button variant="dark" onClick={handleShow}>Delete</Button>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <h3>Are you sure to delete this book</h3>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
           No
          </Button>
          <Button variant="primary" onClick={delClicked} >
         Yes
          </Button>
            </Modal.Footer>
            </Modal>
    </div>
  )
}
