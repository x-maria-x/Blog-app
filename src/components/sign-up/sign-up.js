import React, { useEffect } from 'react'
import { Card, Button, Alert } from 'antd'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { registerUser, clearError } from '../../store/userSlice'

import style from './sign-up.module.scss'

function SignUp() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.user)

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setError,
  } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      const errorObj = JSON.parse(error).errors

      if (errorObj.username) {
        setError('username', {
          type: 'server',
          message: 'Username is already taken',
        })
      }
      if (errorObj.email) {
        setError('email', {
          type: 'server',
          message: 'Email is already taken',
        })
      }
      if (errorObj.password) {
        setError('password', {
          type: 'server',
          message: 'Something went wrong with password',
        })
      }
    }
  }, [error, setError])

  const onSubmit = (data) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }

    dispatch(registerUser(userData))
  }

  function getError() {
    const errorObj = JSON.parse(error).errors
    const er = Object.entries(errorObj)
    const message = er.map((el) => el.join(' - ')).join(' ')

    return message
  }

  if (user?.token) {
    return <Navigate to="/articles" />
  }

  return (
    <Card className={style.card}>
      <p className={style.title}>Create new account</p>
      <form>
        <div className={style.inputWrapper}>
          <div>Username</div>
          <input
            {...register('username', {
              required: 'Username is required!',
              pattern: {
                value: /^[a-z][a-z0-9]*$/,
                message: 'Username no valid!',
              },
              minLength: { value: 3, message: 'username must be between 3 and 20 characters long' },
              maxLength: { value: 20, message: 'username must be between 3 and 20 characters long' },
            })}
          />
          <div className={style.textError}>{errors?.username && (errors?.username?.message || 'Error!!!')}</div>
        </div>

        <div className={style.inputWrapper}>
          <div>Email address</div>
          <input
            {...register('email', {
              required: 'Email is required!',
              pattern: {
                value:
                  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                message: 'Email no valid!',
              },
            })}
          />
          <div className={style.textError}>{errors?.email && (errors?.email?.message || 'Error!!!')}</div>
        </div>

        <div className={style.inputWrapper}>
          <div>Password</div>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required!',
              minLength: { value: 6, message: 'Your password needs to be at least 6 characters.' },
              maxLength: { value: 40, message: 'Your password must contain no more than 40 characters.' },
            })}
          />
          <div className={style.textError}>{errors?.password && (errors?.password?.message || 'Error!!!')}</div>
        </div>

        <div className={style.inputWrapper}>
          <div>Repeat Password</div>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Password is required!',
              validate: (value) => value === watch('password') || 'Passwords do not match',
            })}
          />
          <div className={style.textError}>
            {errors?.confirmPassword && (errors?.confirmPassword?.message || 'Error!!!')}
          </div>
        </div>

        <div className={style.inputWrapper}>
          <label>
            <input
              type="checkbox"
              defaultChecked
              {...register('checkMark', {
                required: 'The check mark of consent to the processing of personal data must be marked!',
              })}
            />
            I agree to the processing of my personal information
          </label>

          <div className={style.textError}>{errors?.checkMark && (errors?.checkMark?.message || 'Error!!!')}</div>
        </div>

        {error && (
          <Alert message={getError()} type="error" style={{ width: '80%', margin: '20px auto', textAlign: 'center' }} />
        )}

        <Button type="submit" onClick={handleSubmit(onSubmit)} className={style.button}>
          {' '}
          Sign Up
        </Button>
      </form>
      <p>
        Already have an account?{' '}
        <Link className={style.link} to="/sign-in">
          Sign In.
        </Link>
      </p>
    </Card>
  )
}

export default SignUp
