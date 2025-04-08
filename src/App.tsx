import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Xss from './pages/Xss'
import CSRF from './pages/CSRF'
import ClickjackingExample from './pages/ClickjackingExample'
import ProtectClickjacking from './pages/ProtectClickjacking'
import SessionHijacking from './pages/SessionHijacking'
import './App.css'
import JestTest from './pages/JestTest'
import SafeTransfer from './pages/SafeTransfer'



const Navbar = () => (
  <header className="navbar">
  <nav>
    <ul>
      <li><Link to="/xss">Xss</Link></li>
      <li><Link to="/csrf">Csrf</Link></li>
      <li><Link to="/safe">SafeTransfer</Link></li>
      <li><Link to="/clickjacking">Clickjacking</Link></li>
      {/* <li><Link to="/protext-clickjacking">Protext Clickjacking</Link></li> */}
      {/* <li><Link to="/session-hijacking">Session Hijacking</Link></li> */}
      <li><Link to="/test">Jest Unit Test</Link></li>
    </ul>
  </nav>
  </header>
);

function App() {

  const userInput = "<p>สวัสดี BabyDev!!</p>";

  


  return (
    <Router>
      <Navbar />
      <Routes>
        {/* create menu navbar each page */}


        <Route path="/xss" element={<Xss />} />
        <Route path="/csrf" element={<CSRF />} />
        <Route path="/safe" element={<SafeTransfer />} />
        <Route path="/clickjacking" element={<ClickjackingExample />} />
        <Route path="/protext-clickjacking" element={<ProtectClickjacking />} />
        <Route path="/session-hijacking" element={<SessionHijacking />} />
        <Route path="/test" element={<JestTest />} />
      
        {/* <Route path="/test" element={<CSRF />} /> */}
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  )
}

export default App
