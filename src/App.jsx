import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './pages/Header';
import SignIn from './pages/signIn';
import Home from './pages/home';
import Cart from './components/cart';
import About from './pages/about';
import History from './pages/history';
import Profile from './pages/profile';
import StoreContextProvider from './context/StoreContextProvider';
import './App.css';
import AdminDashboard from './components/adminDashboard';

function App() {
  const [close, setClose] = useState(false);
  
    // const user=sessionStorage.getItem("role");
    // const isAdmin=user==='admin';
    const [isAdmin, setIsAdmin] = useState(false);

  // Re-check role from sessionStorage whenever App mounts or re-renders
  useEffect(() => {
    const role = sessionStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, [close]);
  
  return (
    <Router>
      <StoreContextProvider>
        <div className="background-clip">
          <video autoPlay loop muted playsInline>
            <source src="/backgroundVedio.mp4" type="video/mp4" />
          </video>
        </div>{!isAdmin?(<>
        
        <div className={close ? 'blur' : 'nonblur'}>
          <Header loginToggle={() => setClose(true)} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
        {close && <SignIn close={() => setClose(false)} />}
        </>):(<>
        <div className='adminUser'>
          <Routes>
            <Route path='/' element={<AdminDashboard login={setIsAdmin}/>}/>
          </Routes>
        </div>
        </>)}
      </StoreContextProvider>
    </Router>
  );
}

export default App;
