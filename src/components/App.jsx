import React from 'react'
import { Routes, Route } from "react-router-dom";
import './styles.css'
import Question1 from './Question1';
import Question2 from './Question2';


const App = () => {
  return (
    <Routes>
        <Route exact path="/" element={<Question1 />} />
        <Route path='/question2' element={<Question2 />} />
    </Routes>
  )
}

export default App