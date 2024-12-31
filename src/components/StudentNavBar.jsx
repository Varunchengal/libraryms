import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Loginpage from './Loginpage';
import { useNavigate } from 'react-router-dom';
import logo from '../images/library.svg'
import StudentEditProfilet from './StudentEditProfile';

function StudentNavBar() {

 

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
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home"><img style={{width:'50px',height:'50px'}} src={logo} alt="" /></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Books</Nav.Link>
                <Nav.Link href="#pricing">Contact</Nav.Link>
                {/* <NavDropdown title="More" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}
              </Nav>
              <Nav>
               <StudentEditProfilet/>
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

export default StudentNavBar