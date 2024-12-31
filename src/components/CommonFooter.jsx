import react, { useEffect } from 'react';
import {Link} from 'react-router-dom';


export default function CommonFooter(){

    useEffect(()=>{
        const role1=sessionStorage.getItem('role')
        const role=JSON.parse(role1)
    })

    return(
        <>
        <div className='footer'>
        <div className='row'>
        <div className='col-3'><Link to={'/'} className='footer-text'>Home</Link></div>
        <div className='col-3'><Link className='footer-text'>About</Link></div>
        <div className='col-3'><Link className='footer-text'>Contact</Link></div>
        <div className='col-3'><Link className='footer-text'>Privacy Policy</Link></div>

        {/* {
            role? role==='student'? <div className='col-3'><Link className='footer-text'>Dashboard</Link></div>
            : <div className='col-3'><Link className='footer-text'>Dashboard</Link></div>
        }
        */}
       
        </div>
        </div> </>
    )
}