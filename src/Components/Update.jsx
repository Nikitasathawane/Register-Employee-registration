import React, { useState, useEffect } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Registration.css';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const modules = {
  toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }]],
};
const formats = ['header', 'list', 'bold', 'italic', 'underline'];

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  dob: Yup.date().required('Date of Birth is required'),
  education: Yup.string().required('Education is required'),
  startDate: Yup.date().required('Start Date is required'),
  endDate: Yup.date().required('End Date is required'),
  currentSalary: Yup.number().required('Current Salary is required'),
  description: Yup.string().required('Description is required'),
});

const Update = () => {
  const location = useLocation();
  const {employee} = location.state ||{};
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeDetail, setEmployeeDetail] = useState({
    FirstName: '',
    LastName: '',
    DOB: '',
    Study: '',
    StartDate: '',
    EndDate: '',
    CurrentSalary: '',
    Description: '',
  });
  

  useEffect(() => {
    if (employee) {
      setEmployeeDetail({
        FirstName: employee.FirstName,
        LastName: employee.LastName,
        DOB: employee.DOB,
        Study: employee.Study,
        StartDate: employee.StartDate,
        EndDate: employee.EndDate,
        CurrentSalary: employee.CurrentSalary,
        Description: employee.Description,
      }
      );
    }
  }, [employee]);
console.log("empolyeeDetails",employeeDetail)
  
  console.log("this is employee id",employee.id)
  const handleDescriptionChange = (value, formik) => {
    formik.setFieldValue('Description', value);
  };

  const handleSubmit = async (values) => {
    try {
      let storage = {
        FirstName: values.values.FirstName,
        LastName: values.values.LastName,
        DOB: values.values.DOB,
        Study: values.values.Study,
        StartDate: values.values.StartDate,
        EndDate: values.values.EndDate,
        CurrentSalary: values.values.CurrentSalary,
        Description: values.values.Description
        
      }
  
      console.log("this are values",storage)
      // Send the form data to your backend
      const response = await axios.post(`https://sweede.app/DeliveryBoy/update-Employee/${employee.id}`,storage);
      navigate("/employee")
      // Check if the request was successful
      if (response.data.success) {
        console.log('Data sent successfully:', response.data);
      } else {
        console.error('Failed to send data:', response.data);
      }
    } catch (error) {
      console.error('Error sending data:', error);
    }
    
  };

  const handleCancel = (formik) => {
    formik.resetForm(); // Reset the form fields to their initial values
  };

  return (
    <div className='container'>
      <div className='form-header'>
        <h1>Employee Registration Form</h1>
      </div>
      <div className='form-container'>
        <Formik initialValues={employeeDetail} validationSchema={validationSchema} onSubmit={handleSubmit}  enableReinitialize={true}>
          {(formik) => (
            <Form>
                            <div className='wrapper'>
              
              <div className='form-group'>
                <label htmlFor='firstName'>First Name:</label>
                <Field type='text' id='firstName' name='FirstName' />
                <ErrorMessage name='FirstName' component='div' className='error' />
              </div>

              <div className='form-group'>
                <label htmlFor='lastName'>Last Name:</label>
                <Field type='text' id='lastName' name='LastName' />
                <ErrorMessage name='LastName' component='div' className='error' />
              </div>
</div>
              <div className='form-group'>
                <label htmlFor='dob'>Date of Birth (DOB):</label>
                <Field type='date' id='dob' name='DOB' />
                <ErrorMessage name='DOB' component='div' className='error' />
              </div>

              <div className='form-group'>
                <label htmlFor='education'>Education:</label>
                <Field type='text' id='education' name='Study' />
                <ErrorMessage name='Study' component='div' className='error' />
              </div>
              <div className='wrapper'>

              <div className='form-group'>
                <label htmlFor='startDate'>Start Date:</label>
                <Field type='date' id='startDate' name='StartDate' />
                <ErrorMessage name='StartDate' component='div' className='error' />
              </div>

              <div className='form-group'>
                <label htmlFor='endDate'>End Date:</label>
                <Field type='date' id='endDate' name='EndDate' />
                <ErrorMessage name='EndDate' component='div' className='error' />
              </div>
</div>
              <div className='form-group'>
                <label htmlFor='currentSalary'>Current Salary:</label>
                <Field type='number' id='currentSalary' name='CurrentSalary' />
                <ErrorMessage name='CurrentSalary' component='div' className='error' />
              </div>

              <div className='form-group'>
                <label htmlFor='description'>Description:</label>
                <ReactQuill
                  id='description'
                  name='Description'
                  modules={modules}
                  formats={formats}
                  value={formik.values.Description}
                  onChange={(value) => handleDescriptionChange(value, formik)}
                />
                <ErrorMessage name='Description' component='div' className='error' />
              </div>

              <div className='form-buttons'>
                <button type='button'
                className='button button-cancel'
                onClick={() => handleCancel(formik)}>
                  Cancel
                </button>

                <button 
                type='submit'
                className='button button-save'
                onClick={() => handleSubmit(formik)}
                >Save</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Update;
