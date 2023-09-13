import React from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Registration.css';
import axios from 'axios';

const modules = {
  toolbar: [['bold', 'italic', 'underline'], [{ 'list': 'ordered' }, { 'list': 'bullet' }]],
};

const formats = ['header', 'list', 'bold', 'italic', 'underline'];

const initialValues = {
  FirstName: '',
  LastName: '',
  DOB: '',
  Study: '',
  StartDate: '',
  EndDate: '',
  CurrentSalary: '',
  Description: '',
};

const validationSchema = Yup.object({
  FirstName: Yup.string().required('First Name is required'),
  LastName: Yup.string().required('Last Name is required'),
  DOB: Yup.date().required('Date of Birth is required'),
  Study: Yup.string().required('Education is required'),
  StartDate: Yup.date().required('Start Date is required'),
  EndDate: Yup.date().required('End Date is required'),
  CurrentSalary: Yup.number().required('Current Salary is required'),
  Description: Yup.string().required('Description is required'),
});

const Registration = () => {
  const handleDescriptionChange = (value, formik) => {
    formik.setFieldValue('Description', value);
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log("values",values)
      let storage = {
          FirstName: values.FirstName,
          LastName: values.LastName,
          DOB: values.DOB,
          Study: values.Study,
          StartDate: values.StartDate,
          EndDate: values.EndDate,
          CurrentSalary: values.CurrentSalary,
          Description: values.Description
          
        }
    

    try {
      // Send the form data to your backend
      const response = await axios.post('https://sweede.app/DeliveryBoy/Add-Employee/', storage);
      
      resetForm();
      
      // Check if the request was successful
      if (response.data.success) {
        // Reset the form after successful submission
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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <div className='wrapper'>
                <div className='form-group'>
                  <label htmlFor='firstName'>First Name*</label>
                  <Field type='text' id='firstName' name='FirstName' placeholder="Enter your name" />
                  <ErrorMessage name='FirstName' component='div' className='error' />
                </div>

                <div className='form-group'>
                  <label htmlFor='lastName'>Last Name*</label>
                  <Field type='text' id='lastName' name='LastName' placeholder="Enter your name" />
                  <ErrorMessage name='LastName' component='div' className='error' />
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='dob'>DOB</label>
                <Field type='date' id='dob' name='DOB' />
                <ErrorMessage name='DOB' component='div' className='error' />
              </div>

              <div className='form-group'>
                <label htmlFor='education'>Study</label>
                <Field type='text' id='education' name='Study' placeholder="B.E" />
                <ErrorMessage name='Study' component='div' className='error' />
              </div>

              <div className='wrapper'>
                <div className='form-group'>
                  <label htmlFor='startDate'>Start Date</label>
                  <Field type='date' id='startDate' name='StartDate' />
                  <ErrorMessage name='StartDate' component='div' className='error' />
                </div>

                <div className='form-group'>
                  <label htmlFor='endDate'>End Date</label>
                  <Field type='date' id='endDate' name='EndDate' />
                  <ErrorMessage name='EndDate' component='div' className='error' />
                </div>
              </div>

              <div className='form-group'>
                <label htmlFor='currentSalary'>Current Salary</label>
                <Field type='number' id='currentSalary' name='CurrentSalary' placeholder="30000" />
                <ErrorMessage name='CurrentSalary' component='div' className='error' />
              </div>

              <div className='form-group'>
                <label htmlFor='Description'>Description:</label>
                <ReactQuill
                  id='Description'
                  name='Description'
                  modules={modules}
                  formats={formats}
                  value={formik.values.Description}
                  onChange={(value) => handleDescriptionChange(value, formik)}
                />
                <ErrorMessage name='Description' component='div' className='error' />
              </div>

              <div className='form-buttons'>
                <button
                  type='button'
                  onClick={() => handleCancel(formik)}
                  className='button button-cancel'
                >
                  Cancel
                </button>

                <button type='submit' className='button button-save'>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registration;
