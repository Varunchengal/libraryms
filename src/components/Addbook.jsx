import { Category } from '@mui/icons-material';
import react, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { bookAdd } from '../services/allApis';
import './main.css'
import UploadIcon from '@mui/icons-material/CloudUpload';
import Adminsidebar from './Adminsidebar';
import { toast } from 'react-toastify';
import Navbartop from './Navbartop'
import { BASEURL } from '../services/baseUrl';

export default function Addbook(){
    
    const [show, setShow] = useState(false);
    const [book,setBook]=useState({})

    const [preview,setPreview]=useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const img='https://img.freepik.com/free-photo/amazing-ants-carry-fruit-heavier-than-their-bodies-amazing-strong-ant_488145-2669.jpg'
    useEffect(()=>{
      const tokenn=sessionStorage.getItem("token")
      const token=JSON.parse(tokenn)
      const uID=sessionStorage.getItem('userId')
  
      if(book.cover){
      setPreview(URL.createObjectURL(book.cover))
      }
    },[book.cover])

    const addBook=async(e)=>{
      e.preventDefault()
     
      if(book.title && book.cover && book.category && book.count && book.description && book.author && sessionStorage.getItem("token") && sessionStorage.getItem('userId')){

        const tokenn=sessionStorage.getItem("token")
        const token=JSON.parse(tokenn)

        const uId=sessionStorage.getItem("userId")
        const userId=JSON.parse(uId)

        const books=new FormData()
        books.append("title",book.title)
        books.append("author",book.author)
        books.append("description",book.description)
        books.append("cover",book.cover)
        books.append("count",book.count)
        books.append("category",book.category)
        books.append("uId",book.uId)

        const headers={
          'Content-Type':'multipart/form-data', 'Authorization':`Bearer ${token}`
          
        }
        const result=await bookAdd(books,headers)

        if(result.status===200){
          toast.success("Book added successfully..")
          setBook({
           title:'',
           description:'',
           author:'',
           count: '',
           category:'',
           cover:''
          })
        }else{
          toast.error("Book adding failed..")
        }
        console.log(result)
      }else{
toast.error("Enter all fields")
      }

    }



    console.log(book)
    return(
      <>
      <Navbartop/>
        <div className='row'>
          <div className='col-2 bg-sbar'><Adminsidebar/></div>
          <div className='col-10'>
          <div className="book-add-box">
          <div className='book-add'>
          <Form>
        <table><tbody>    
          <tr> 
          
           <td className="pe-2"> 
            <label htmlFor="image">
              <input type="file" style={{display:'none'}} name="image"  id="image" onChange={(e)=>setBook({...book,cover:e.target.files[0]})} />
              {/* <UploadIcon sx={{ fontSize: 50 }} /> <br /> */}
          { preview? 
          ( <img className="upload" src={preview} alt="cover image" />)
          :
          (<div><UploadIcon sx={{ fontSize: 50 }} /></div>)
          }
           
            </label>
           </td>
           <td className="ps-3">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control 
              onChange={(e)=>setBook({...book,title:e.target.value})}
                type="text"
                placeholder="Title here"
                autoFocus
                value={book.title}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control
              onChange={(e)=>setBook({...book,description:e.target.value})}
                as="textarea"
                placeholder="description"
                value={book.description}
              />
            </Form.Group>

   

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Author</Form.Label>
              <Form.Control 
              onChange={(e)=>setBook({...book,author:e.target.value})}
                type="text"
                placeholder="Author name here"
                value={book.author}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Count</Form.Label>
              <Form.Control 
            
              onChange={(e)=>setBook({...book,count:e.target.value})}
                type="number"
                placeholder="add book count"
                value={book.count}
                
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category</Form.Label>
              <Form.Select name="category" onChange={(e)=>setBook({...book,category:e.target.value})} value={book.category}>
              <option selected disabled>-select-</option>
                <option value="Novel">Novel</option>
                <option value="Poem">Poem</option>
                <option value="Short story">Short Story</option>
                <option value="biography">Biography</option>
              </Form.Select>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>UserId</Form.Label>
              <Form.Control 
            
              onChange={(e)=>setBook({...book,uId:e.target.value})}
                type="text"
                
                placeholder="user id"
                
              />
            </Form.Group> */}
            </td>
          </tr>
          </tbody>
          </table>
          </Form> </div>
      </div>
      <Button className="mt-2 btn-add" variant="primary" onClick={(e)=>addBook(e)}>
          Add
          </Button>
      </div></div>
      </>
    )
}