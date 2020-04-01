import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Formik } from 'formik'
import * as Yup from 'yup'
import form from '../form.module.css'
import gql from 'graphql-tag'
import Error from '../Error'

const validation = Yup.object().shape({
  firstName: Yup.string()
    .max(12)
    .required('Must enter name'),
  lastName: Yup.string()
    .max(12)
    .required('Must enter name'),
  username: Yup.string()
    .max(10, 'Must be less than 10 caracters')
    .required('Enter your username'),
  password: Yup.string()
    .required('Must enter a password')
    .min(5, 'Password too short')
})

const SIGN_UP = gql`
  mutation sign_up($data: SignupInput!){
    signup(data: $data){
      user{
        id
        username
      }
      jwt
    }
  }
`

function SignUp () {
  const history = useHistory()
  const [error, setError] = useState(null)
  const [signup] = useMutation(SIGN_UP, {
    onCompleted: RegistrationSuccess,
    onError: RegistrationFailure
  }
  )

  function RegistrationFailure () {
    return (
      setError(true)
    )
  }

  function RegistrationSuccess () {
    setError(false)
    return (
      setTimeout(Redirect, 1500)
    )
  }

  function Redirect () {
    history.push('/auth/signin')
  }

  return (
    <div className={form.outer}>
      <div className={form.middle}>
        <div className={form.inner}>
          <div id={form.formContent}>
            <h1>Member Registration</h1>
            {error &&
              <h3 className={form.error}>  oh snap! Something went wrong  </h3>}
            {error === false &&
              <h3 className={form.correct}>  User created successfully  </h3>}
            <Formik
              initialValues={{ firstName: '', lastName: '', username: '', password: '' }}
              validationSchema={validation}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true)
                await signup({
                  variables: {
                    data: values
                  }
                })
                setSubmitting(false)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
              }) => (
                <form onSubmit={handleSubmit}>
                  <div>
                    <input
                      type='text'
                      className={touched.firstName && errors.firstName ? form.haserror : form.form}
                      id='firstName'
                      placeholder='FirstName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    />
                    <Error touched={touched.firstName} message={errors.firstName} />
                  </div>
                  <div>
                    <input
                      type='text'
                      className={touched.lastName && errors.lastName ? form.haserror : form.form}
                      id='lastName'
                      placeholder='LastName'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName}
                    />
                    <Error touched={touched.lastName} message={errors.lastName} />
                  </div>
                  <div>
                    <input
                      type='text'
                      className={touched.username && errors.username ? form.haserror : form.form}
                      id='username'
                      placeholder='Username'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                    <Error touched={touched.username} message={errors.username} />
                  </div>
                  <div>
                    <input
                      type='password'
                      className={touched.password && errors.password ? form.haserror : form.form}
                      id='password'
                      placeholder='Password'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <Error touched={touched.password} message={errors.password} />
                  </div>
                  <button
                    type='submit'
                    className={form.button}
                    disabled={isSubmitting}
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
  )
}

export default SignUp
