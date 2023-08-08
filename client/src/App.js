import React from 'react'
import {Routes,Route} from 'react-router-dom';
// import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home"; 
import About from "./components/About"; 
import Contact from "./components/Contact"; 
import Login from "./components/Login"; 
import Signup from "./components/Signup"; 

const App =() =>{
  return (
    <>
    <Navbar/>
    
    <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>


    <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    

      <Routes>
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Routes>
        <Route path="/signup" element={<Signup />} />
      </Routes>
    
    </>
  )
}

export default App
