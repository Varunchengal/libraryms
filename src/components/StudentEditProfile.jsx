import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { adminView, editProfile, editStudentProfile } from '../services/allApis';
import { toast } from 'react-toastify';
import { BASEURL } from '../services/baseUrl';

export default function StudentEditProfilet() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [edit, setEdit] = useState({})
    const [valName, setValName] = useState(true)
    const [valGen, setValGen] = useState(true)
    const [valAge, setValAge] = useState(true)
    const [valAddress, setValAddress] = useState(true)
    const [valEmail, setValEmail] = useState(true)
    const [valPass, setValPass] = useState(true)
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState()

    useEffect(() => {
        const uId = sessionStorage.getItem("userId")
    }, [])

    const viewStudent = async () => {
        if (sessionStorage.getItem('userId')) {
            const uId = sessionStorage.getItem("userId")
            const userId = JSON.parse(uId)

            const result = await adminView(userId)
            console.log(result)
            setUser(result.data)

            setEdit(result.data)
        }
    }

    useEffect(() => {
        const tok = sessionStorage.getItem("token")
        if (user.profile !== edit.profile) {
            setPreview(URL.createObjectURL(edit.profile))
        }
    }, [edit.profile])

    useEffect(() => {
        viewStudent()
    }, [])


    const editUser = (e) => {
        const { name, value } = e.target

        if (name === 'name') {
            if (!!value.match(/^[a-zA-Z ]+$/)) {
                setEdit({ ...edit, [name]: value })
                setValName(true)
            } else {
                setValName(false)
            }
        } else if (name === 'gender') {
            if (value) {
                setEdit({ ...edit, [name]: value })
                setValGen(true)
            } else {
                setValGen(false)
            }
        } else if (name === 'age') {
            if (!!value.match(/^[0-9]+$/) && value > 0) {
                setEdit({ ...edit, [name]: value })
                setValAge(true)
            } else {
                setValAge(false)
            }
        } else if (name === 'address') {
            if (value) {
                setEdit({ ...edit, [name]: value })
                setValAddress(true)
            } else {
                setValAddress(false)
            }
        } else if (name === 'email') {
            if (!!value.match(/^[a-z0-9.-_]+@[a-z]+\.[a-z]{2,}$/)) {
                setEdit({ ...edit, [name]: value })
                setValEmail(true)
            } else {
                setValEmail(false)
            }
        } else if (name === 'password') {
            if (value) {
                setEdit({ ...edit, [name]: value })
                setValPass(true)
            } else {
                setValPass(false)
            }
        }
    }

    const saveClicked = async () => {
        if (edit.name && edit.email && edit.password) {



            const studs = new FormData()
            studs.append("name", edit.name)
            studs.append("gender", edit.gender)
            studs.append("age", edit.age)
            studs.append("address", edit.address)
            studs.append("email", edit.email)
            studs.append("password", edit.password)
            studs.append("profile", edit.profile)

            console.log(studs)

            const headers = {
                'Content-Type': 'multipart/form-data'
            }
            const result = await editStudentProfile(user._id, studs, headers)
            console.log(result)

            if (result.status === 200) {
                toast.success("Succesfully Edited")
                viewStudent()
            } else {
                toast.error("Editing failed")
            }
        }
        handleClose()
    }

    console.log(user)
    console.log(edit)
    return (
        <div>
            <div>
                <Button className='me-2' variant="secondary" onClick={handleShow}>
                    Edit Profile
                </Button>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Profile</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <label htmlFor="profile"><input type="file" name="profile" id="profile" style={{ display: 'none' }} onChange={(e) => { setEdit({ ...edit, profile: e.target.files[0] }) }} /><img style={{ width: '300px', height: '300px' }} src={preview ? `${preview}` : `${BASEURL}/upload/${edit.profile}`} alt="" /></label>
                            <Form.Group className="mb-2">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    onChange={(e) => editUser(e)}
                                    type="text"
                                    defaultValue={edit.name}
                                    placeholder="your name"
                                    name="name"
                                    autoFocus

                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Gender</Form.Label>
                                <Form.Check
                                    inline
                                    label="Female"
                                    name="gender"
                                    value="female"
                                    type='radio'
                                    id="gender"
                                    checked={edit.gender === 'female'}
                                    onChange={(e) => editUser(e)}
                                />
                                <Form.Check
                                    inline
                                    label="Male"
                                    name="gender"
                                    value="male"
                                    type='radio'
                                    id="gender"
                                    checked={edit.gender === 'male'}
                                    onChange={(e) => editUser(e)}
                                />
                                <Form.Check
                                    inline
                                    label="Other"
                                    name="gender"
                                    value="other"
                                    type='radio'
                                    id="gender"
                                    checked={edit.gender === 'other'}
                                    onChange={(e) => editUser(e)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    // onChange={(e)=>setBookEdited({...bookEdited,description:e.target.value})}
                                    type="number"
                                    placeholder="your age"
                                    name="age"
                                    defaultValue={user.age}
                                    onChange={(e) => editUser(e)}
                                    autoFocus
                                />
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    // onChange={(e)=>setBookEdited({...bookEdited,author:e.target.value})}
                                    defaultValue={user.address}
                                    as="textarea"
                                    name="address"
                                    placeholder="your address"
                                    onChange={(e) => editUser(e)}
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    name="email"
                                    // onChange={(e)=>setBookEdited({...bookEdited,count:e.target.value})}
                                    defaultValue={user.email}
                                    type="email"
                                    placeholder="your email"
                                    onChange={(e) => editUser(e)}
                                    autoFocus
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    name="password"
                                    // onChange={(e)=>setBookEdited({...bookEdited,count:e.target.value})}
                                    defaultValue={user.password}
                                    type="password"
                                    placeholder="password"
                                    onChange={(e) => editUser(e)}
                                    autoFocus
                                />
                            </Form.Group>

                            <Button className="btn btn-secondary me-2" onClick={handleClose}>Close</Button>

                            <Button className="btn btn-primary" onClick={saveClicked}>Save</Button>

                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    )
}
