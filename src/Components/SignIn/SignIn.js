import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import form from '../form.module.css'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import * as Storage from '../Storage'
import Error from '../Error'

const validation = Yup.object().shape({
  username: Yup.string()
    .min(1, 'Must have more than 1 caracter')
    .max(10, 'Must be less than 10 caracters')
    .required('Username is required'),
  password: Yup.string()
    .required('Must enter a password')
})

const SIGN_IN = gql`
  mutation sign_in($data: SigninInput!){
    signin(data: $data){
      user{
        id
      }
      jwt
    }
  }
`

export default function SignIn () {
  const [error, setError] = useState(null)
  const history = useHistory()
  const [signin] = useMutation(SIGN_IN, {
    onCompleted: LoginSuccess,
    onError: LoginFailed
  })
  function LoginSuccess ({ signin }) {
    Storage.setToken(signin.jwt)
    setError(false)
    history.push('/home')
  }

  function LoginFailed () {
    return (
      setError(true)
    )
  }

  return (
    <div className={form.outer}>
      <div className={form.middle}>
        <div className={form.inner}>
          <div id={form.formContent}>
            <h1>Sign In</h1>
            {error &&
              <h3 className={form.error}>  oh snap! Something went wrong  </h3>}
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validation}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                await signin({
                  variables: {
                    data: values
                  }
                })
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
                      className={touched.username && errors.username ? form.haserror : form.form}
                      id='username'
                      placeholder='Enter your username'
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
                  >Login
                  </button>
                </form>
              )}
            </Formik>
            <Link to='/auth/signup'>
                  Don't have an account? Create one!
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
