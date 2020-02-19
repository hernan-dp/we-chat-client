/* global alert */
import React from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './Welcome.css'

const validation = Yup.object().shape({
  firstname: Yup.string()
    .max(12)
    .required('Must enter name'),
  lastname: Yup.string()
    .max(12)
    .required('Must enter name'),
  username: Yup.string()
    .max(10, 'Must be less than 10 caracters')
    .required('Enter your username'),
  password: Yup.string()
    .required('Must enter a password')
    .min(5, 'Must be atleast longer than 5 characters')
})

export default function SignUp () {
  return (
    <div className='outer'>
      <div className='middle'>
        <div className='inner'>
          <div className='wrapper fadeInDown'>
            <div id='formContent'>
              <h1>Member Registration</h1>
              <Formik
                initialValues={{ firstname: '', lastname: '', username: '', password: '' }}
                validationSchema={validation}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  setSubmitting(true)
                  alert(JSON.stringify({ values }))
                  resetForm()
                  setSubmitting(false)
                }}
              >
                {({
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <form onSubmit={handleSubmit}>
                    <input
                      type='text'
                      id='firstname'
                      className='fadeIn first'
                      placeholder='FirstName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstname}
                    />
                    <input
                      type='text'
                      id='lastname'
                      className='fadeIn second'
                      placeholder='LastName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                    />
                    <input
                      type='text'
                      id='username'
                      className='fadeIn third'
                      placeholder='Username'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <input
                      type='password'
                      id='password'
                      className='fadeIn fourth'
                      placeholder='Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <button
                      type='submit'
                      className='fadeIn third'
                      disable={isSubmitting}
                    >
                      Sign up
                    </button>
                  </form>
                )}
              </Formik>
              <Link to='/auth/signin'>
                  Do you already have a account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
