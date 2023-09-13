
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registration from './Components/Registration';
import EmployeeList from './Components/employeeList';
import EmployeeDetails from './Components/EmployeeDetails';
import Navbar from "./Components/Navbar"
import Update from './Components/Update';
import { useState } from 'react';


function App() {
  const [employeeId,setEmployeeId]=useState("")

  const Details = (value)=>setEmployeeId(value)

  return (
    <Router>
       <Navbar />
      <Routes>
        <Route path='/' element={<Registration/>}></Route>
        <Route path="/updateemployee/:id" element={<Update />} />
        <Route path='/employee' element={<EmployeeList setId={Details} />}></Route>
        <Route path='/employee/:id' element={<EmployeeDetails id={employeeId}/>}></Route>

      </Routes>
    </Router>
  )
}

export default App
