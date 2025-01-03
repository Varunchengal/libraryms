import react from 'react';
import { Link } from 'react-router-dom';
import './main.css'

export default function Adminsidebar(){


    return(
        <div>
            <div className='sidebar-text mt-5 ps-1'>
                <Link className='sidebar-link mb-5' to={'/admin'}>Dashboard</Link> <br /><br />
                <Link className='sidebar-link' to={'/admin/books'}>View Books</Link> <br /><br />
                <Link className='sidebar-link' to={'/admin/add'}>Add Book</Link> <br /><br />
                <Link className='sidebar-link' to={'/admin/view'}>View Students</Link> <br /><br />
                <Link className='sidebar-link' to={'/admin/history'}>View Reservation</Link> <br /><br />
                <Link className='sidebar-link' to={'/admin/edit'}>Edit Profile</Link> <br />
            </div>
        </div>
    )
}
