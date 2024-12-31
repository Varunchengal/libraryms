import react,{useEffect} from 'react';
import './main.css';
import Adminsidebar from './Adminsidebar'
import { useNavigate } from 'react-router-dom';
import Navbartop from './Navbartop';

export default function Adminhomepage(){

  const navigate=useNavigate()

    useEffect(()=>{

        if(sessionStorage.getItem("token")){
        
        }else{
            navigate('/login')
        }
        const user=sessionStorage.getItem("user")
        const id=JSON.parse(user)
        const token1=sessionStorage.getItem("token")
        const token=JSON.parse(token1)
        const role1=sessionStorage.getItem("role")
        const role=JSON.parse(role1)
    },[])

    

    return(
        <>
        <Navbartop/>
        <div className='admin-main-page row'>
        <div className='col-2 bg-sbar'><Adminsidebar/></div>
        <div className='col-10'>
            <div>Welcome</div>
        </div>
        </div>
        </>
    )
}