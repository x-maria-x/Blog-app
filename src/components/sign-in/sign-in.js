import React, { useEffect } from 'react'
import { Card, Button, Alert } from 'antd'
import { useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser, clearError } from '../../store/userSlice'

import style from './sign-in.module.scss'

function SignIn() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.user)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' })

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  const onSubmit = (data) => {
    const userData = {
      user: { ...data },
    }
    dispatch(loginUser(userData))
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
      <p className={style.title}>Sign In</p>
      <form>
        <div className={style.inputWrapper}>
          <div>Email</div>
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
            })}
          />
          <div className={style.textError}>{errors?.password && (errors?.password?.message || 'Error!!!')}</div>
        </div>

        {error && (
          <Alert message={getError()} type="error" style={{ width: '80%', margin: '20px auto', textAlign: 'center' }} />
        )}

        <Button type="submit" onClick={handleSubmit(onSubmit)} className={style.button}>
          {' '}
          Sign In
        </Button>
      </form>
      <p>
        Don’t have an account?{' '}
        <Link className={style.link} to="/sign-up">
          Sign Up.
        </Link>
      </p>
    </Card>
  )
}

export default SignIn
