
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import  Navbartop  from './components/Navbartop';
import StudentRegister from './components/StudentRegister';
import { ToastContainer } from 'react-toastify';
import Loginpage from './components/Loginpage';
import BookviewAdmin from './components/BookviewAdmin';
import Addbook from './components/Addbook';
import Changepassword from './components/Changepassword';
import Forgotpassword from './components/Forgotpassword';
import Adminhomepage from './components/Adminhomepage';
import Studenthomepage from './components/Studenthomepage';
import Editbook from './components/Editbook';
import Deletebook from './components/Deletebook';
import EditAdminProfile from './components/EditAdminProfile';
import ViewsStudents from './components/ViewsStudents';
import StudentEditProfilet from './components/StudentEditProfile';
import BookHistoryStudent from './components/BookHistoryStudent';
import AdminViewReservation from './components/AdminViewReservation';
import CommonFooter from './components/CommonFooter';


function App() {
  return (
    <div className="App gx-0">
    
     <Routes><Route path='/' element={<Homepage/>}/>
     <Route path='reg' element={<StudentRegister/>}/>
     <Route path='login' element={<Loginpage/>}/>
     <Route path='admin/books' element={<BookviewAdmin/>}/>
     <Route path='admin/add' element={<Addbook/> }/>
     <Route path='change' element={<Changepassword/>} />
     <Route path='forgot' element={<Forgotpassword/>} />
     <Route path='admin' element={<Adminhomepage/>} />
     <Route path='student' element={<Studenthomepage/>} />
     <Route path="book-edit" element={<Editbook/>} />
     <Route path="book-delete" element={<Deletebook/>} />
     <Route path='admin/edit' element={<EditAdminProfile/>} />
     <Route path='admin/view' element={<ViewsStudents/>} />
     <Route path='student/edit' element={<StudentEditProfilet/>} />
     <Route path='student/history' element={<BookHistoryStudent/>} />
     <Route path='admin/history' element={<AdminViewReservation/>} />
     
     </Routes>
     <CommonFooter/>
     <ToastContainer/>
    </div>
  );
}

export default App;
