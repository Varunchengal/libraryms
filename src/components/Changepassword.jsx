import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { changePass1, mailCheck } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function Changepassword() {
    const [pass, setPass] = useState({})
    const [valPass, setValPass] = useState(true)

    useEffect(() => {
        const data = sessionStorage.getItem("user")
        const id = JSON.parse(data)
        console.log(id)
    }, [])

    const changePass = async () => {
        if (sessionStorage.getItem("user")) {
            const id = sessionStorage.getItem("user")
            const idd=JSON.parse(id)
            if (pass.epass == pass.cpass) {
                const password = pass.epass
                console.log(password)
                setValPass(true)
                const result = await changePass1(idd, {password})
                console.log(result)
                if (result.status == 200) {
                    toast.success("Password Changed Successfully..")
                } else {
                    toast.error("OOPS Password changing failed..")
                }

            }
        } else {
            setValPass(false)
        }
    }

    const clear = async (e) => {
        setPass({
            epass: '',
            cpass: ''
        })
    }

    console.log(pass)
    return (
        <div>
            <Form>
                <Form.Group className="ms-5 me-5" controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control value={pass.epass} onChange={(e) => setPass({ ...pass, epass: e.target.value })}
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                    />
                </Form.Group>

                <Form.Group className="ms-5 me-5 mb-4" controlId="exampleForm.ControlInput1">
                    <Form.Label>Conform password</Form.Label>
                    <Form.Control value={pass.cpass} onChange={(e) => setPass({ ...pass, cpass: e.target.value })}
                        type="email"
                        placeholder="name@example.com"
                        autoFocus
                    />
                </Form.Group>
                {!valPass && <p className="error">Password does'nt match</p>}
            </Form>

            <Button variant="secondary" className="me-3" onClick={(e) => clear(e)} >
                Clear
            </Button>
            <Button variant="primary" onClick={changePass} >
                Next
            </Button>



        </div>
    )
}
