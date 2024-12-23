import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;