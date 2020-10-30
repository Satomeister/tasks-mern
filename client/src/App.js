import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Routes from './components/Routes'

const App = () => {
    return (
        <Router>
            <Navbar/>
            <div className='container'>
                <Routes isAuth={false}/>
            </div>
        </Router>
    )
}

export default App;
