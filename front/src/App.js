import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Pages/Home.jsx';
import MyJobs from './components/Pages/MyJobs.jsx';
import Profile from './components/Pages/Profile.jsx'
import Register from './components/Pages/Register.jsx';
import Login from './components/Pages/Login.jsx';

function PrivateRoute({ children }) {
 const token = localStorage.getItem('token');

 if (!token) {
    return <Navigate to="/login" />;
 }

 return children;
}

function App() {
 return (
    <div className="App">
      <Routes>
        <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
        <Route path='/myjobs' element={<PrivateRoute><MyJobs/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        
      </Routes>
      
      <ToastContainer/>
    </div>
 );
}

export default App;