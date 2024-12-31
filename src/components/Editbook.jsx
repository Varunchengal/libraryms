
import react, { useState,useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import './main.css';
import { BASEURL } from '../services/baseUrl';
import { bookEditer } from '../services/allApis';
import { toast } from 'react-toastify';

export default function Editbook({books}){
    
    const [show, setShow] = useState(false);
    const [bookEdited,setBookEdited]=useState({
      title:books.title,
      description:books.description,
      cover:books.cover,
      author:books.author,
      count:books.count,
      category:books.category
    })

    const [preview,setPreview]=useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{

      if(books.cover!=bookEdited.cover){
        setPreview(URL.createObjectURL(bookEdited.cover))
        const toke=sessionStorage.getItem("token")
      
      }
    },[bookEdited.cover])

    const saveClicked=async(e)=>{
      e.preventDefault()
if(sessionStorage.getItem("token")){

  const toke=sessionStorage.getItem("token")
  const token=JSON.parse(toke)

  // const uid=sessionStorage.getItem("userId")
  // const id=JSON.parse(uid)

      const edited= new FormData()

      edited.append("title",bookEdited.title)
      edited.append("description",bookEdited.description)
      edited.append("cover",bookEdited.cover)
      edited.append("author",bookEdited.author)
      edited.append("count",bookEdited.count)
      edited.append("category",bookEdited.category)
console.log(edited)
      const headers={
         'Content-Type':'multipart/form-data', 'Authorization':`Bearer ${token}`
      }
      const id=books._id
      const result=await bookEditer(id,edited,headers)
      console.log(result)
      if(result.status===200){
        toast.success("Editing Successfully..")
    
        handleClose()
      }else{
        toast.error("Editing Failed..")
        handleClose()
      }
    }
  }

 

    console.log(bookEdited)
    console.log(books)
    return(
        <div>
            <Button onClick={handleShow}>Edit</Button>
            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control 
              onChange={(e)=>setBookEdited({...bookEdited,title:e.target.value})}
                type="text"
                defaultValue={books.title}
                placeholder="Title here"
                autoFocus
               
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
              onChange={(e)=>setBookEdited({...bookEdited,description:e.target.value})}
                as="textarea"
                placeholder="description"
                defaultValue={books.description}
                autoFocus
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Cover</Form.Label>
              <Form.Control 
              onChange={(e)=>setBookEdited({...bookEdited,cover:e.target.files[0]})}
              
                type="file"
                placeholder="Title here"
                autoFocus
              />
            </Form.Group> */}
<div className='edit-center'>
            <label htmlFor="cover">
              <input type="file" style={{display:'none'}} name="cover" id="cover" onChange={(e)=>setBookEdited({...bookEdited,cover:e.target.files[0]})}/>
            { 
              preview? ( <img className="upload" src={preview} alt="cover" />)
              :
              (<img className="upload" src={`${BASEURL}/upload/${books.cover}`} alt="co" /> )
            }  
            </label> </div> <br />

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Author</Form.Label>
              <Form.Control 
              onChange={(e)=>setBookEdited({...bookEdited,author:e.target.value})}
              defaultValue={books.author}
                type="text"
                placeholder="Author name"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Count</Form.Label>
              <Form.Control 
              name="count"
              onChange={(e)=>setBookEdited({...bookEdited,count:e.target.value})}
              defaultValue={books.count}
                type="text"
                placeholder="add book count"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" defaultValue={books.category} onChange={(e)=>setBookEdited({...bookEdited,category:e.target.value})}>
                <option selected disabled>-select-</option>
                <option value="Novel">Novel</option>
                <option value="Poem">Poem</option>
                <option value="Short story">Short Story</option>
                <option value="biography">Biography</option>

              </Form.Select>
          
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e)=>saveClicked(e)}>
          Edit
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}