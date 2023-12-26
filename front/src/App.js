import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Pages/Home.jsx';
import MyJobs from './components/Pages/MyJobs.jsx';
import Profile from './components/Pages/Profile.jsx'
import Register from './components/Pages/Register.jsx';

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/myjobs' element={<MyJobs/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes> */}
      <Register/>
    </div>
  );
}

export default App;
