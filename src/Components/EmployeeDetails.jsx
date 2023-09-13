// EmployeeDetails.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import "./EmployDetails.css"
const EmployeeDetails = ({id}) => {
  const location = useLocation();
  const {employee} = location.state ||{};
 
 const navigate = useNavigate();


  const handleClick = ()=>{
    navigate("/employee")
  }

  return (
    <div className="employee-details">
      <h1>Employee Details</h1>
      <div className="employee-info">
        <h2>Name: {`${employee.FirstName} ${employee.LastName}`}</h2>
        <p>Date of Birth (DOB): {employee.DOB}</p>
        <p>Study: {employee.Study}</p>
        <p>Start Date: {employee.StartDate}</p>
        <p>End Date: {employee.EndDate}</p>
        <p>Current Salary: {employee.CurrentSalary}</p>
        <p>Description:</p>
        <div dangerouslySetInnerHTML={{ __html: employee.Description }} />
      </div>
      <button className='button spacer' onClick={handleClick}>go back</button>
    </div>
  );
};

export default EmployeeDetails;
