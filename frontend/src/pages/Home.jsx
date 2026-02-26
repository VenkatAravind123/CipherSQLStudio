import React from 'react'
import { Link,  useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate();
  return (
    <div className='page'>
        <nav className='homenav'>
        <div className='header'>CipherSQLStudio</div>
        <div className='nav-links'>
            <Link to='/curriculum'>Curriculum</Link>
            <Link to='/practice'>Practice</Link>
            <Link to='/pricing'>Pricing</Link>
        </div>
        <div className='auth-links'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
        </div>
        </nav>

        <div className='hero'>
<h1>Learn SQL by building real queries</h1>
<h3>Master database querying skills with hands-on practice</h3>
<button className='cta-button' onClick={()=>navigate("/signup")}>SignUp for free</button>
<button className='secondary-button' onClick={()=>navigate("/login")}>Log In</button>
        </div>


        <div className='cards'>
            <div className='card'>
                <h2>Interactive Practice</h2>
                <p>Practice using our interactive SQL editor with real-time feedback.</p>
            </div>
            <div className='card'>
                <h2>Guided Lessons</h2>
                <p>Learn SQL concepts guided by our AI assistant.</p>
            </div>
            <div className='card'>
                <h2>Progress Tracking</h2>
                <p>Track your learning progress and achievements with our built-in analytics.</p>
            </div>
        </div>


        <footer>
            <p>&copy; 2024 CipherSQL. All rights reserved.</p>
        </footer>
        
    </div>
  )
}
