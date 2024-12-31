import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Loginpage from './Loginpage';
import { useNavigate ,Link} from 'react-router-dom';
import './main.css'


function Navbartop() {

 

  useEffect(()=>{
    const user=sessionStorage.getItem("userId")
  },[])
  const user=sessionStorage.getItem("userId")
  const id=JSON.parse(user)
  
 const navigate=useNavigate()

  const logout=()=>{
    sessionStorage.clear()
    navigate('/')
  }

      return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navbar-fixed">
          <Container>
            <Navbar.Brand href="#home">Library</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
              <Link className='pt-2 pe-2 text-secondary' style={{textDecoration:'none'}} to={'/admin'}>Dashboard</Link>
              <Nav.Link href="#pricing">Contact</Nav.Link>
                <NavDropdown title="More" id="collapsible-nav-dropdown">
                <Link className='ps-3 pt-3 text-dark' style={{textDecoration:'none'}} to={'/admin/books'}>View Books</Link>
                   <br/>
                  <Link className='ps-3 pt-3 text-dark' style={{textDecoration:'none'}} to={'/admin/add'}>Add Book</Link>
                   <br/>
                  <Link className='ps-3 text-dark pt-3' style={{textDecoration:'none'}} to={'/admin/view'}>Students</Link>
                   
                  <NavDropdown.Divider />
                   <Link className='ps-2 text-dark' style={{textDecoration:'none'}} to={'/admin/edit'}>Edit Profile</Link>
                   
                  
                </NavDropdown>
              </Nav>
              <Nav>
               
               { id? <Button onClick={logout}>Logout</Button>
               :
               <Loginpage/>
               }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }

export default Navbartop