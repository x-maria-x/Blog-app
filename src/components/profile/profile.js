import React, { useCallback, useEffect } from 'react'
import { Card, Button, Alert } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { updateUser, clearError } from '../../store/userSlice'

import style from './profile.module.scss'

function Profile() {
  const dispatch = useDispatch()

  const { error } = useSelector((state) => state.user)
  const { user } = useSelector((state) => state.user)

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({ mode: 'onBlur' })

  function onSubmit(data) {
    dispatch(updateUser({ user: data }))
  }

  const getError = useCallback(() => {
    const errorObj = JSON.parse(error).errors
    const er = Object.entries(errorObj)
    const message = er.map((el) => el.join(' - ')).join(' ')

    return message
  }, [error])

  useEffect(() => {
    dispatch(clearError())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      const errorObj = JSON.parse(error).errors

      if (errorObj.username) {
        setError('username', {
          type: 'server',
          message: 'Something went wrong with username',
        })
      }
      if (errorObj.email) {
        setError('email', {
          type: 'server',
          message: 'Something went wrong with email',
        })
      }
      if (errorObj.password) {
        setError('password', {
          type: 'server',
          message: 'Something went wrong with password',
        })
      }
      if (errorObj.image) {
        setError('image', {
          type: 'server',
          message: 'Something went wrong with image',
        })
      }
    }
  }, [error, setError, getError])

  if (user?.token) {
    return (
      <Card className={style.card}>
        <p className={style.title}>Edit Profile</p>
        <form>
          <div className={style.inputWrapper}>
            <div>Username</div>
            <input
              defaultValue={user.username}
              {...register('username', {
                required: 'Username is required!',
                minLength: { value: 3, message: 'username must be between 3 and 20 characters long' },
                maxLength: { value: 20, message: 'username must be between 3 and 20 characters long' },
              })}
            />
            <div className={style.textError}>{errors?.username && (errors?.username?.message || 'Error!!!')}</div>
          </div>

          <div className={style.inputWrapper}>
            <div>Email address</div>
            <input
              defaultValue={user.email}
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
            <div>New password</div>
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
            <div>Avatar image (url)</div>
            <input
              defaultValue={user.image}
              {...register('image', {
                pattern: {
                  value:
                    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
                  message: 'URL no valid!',
                },
              })}
            />
            <div className={style.textError}>{errors?.image && (errors?.image?.message || 'Error!!!')}</div>
          </div>

          {error && (
            <Alert
              message={getError()}
              type="error"
              style={{ width: '80%', margin: '20px auto', textAlign: 'center' }}
            />
          )}

          <Button type="submit" onClick={handleSubmit(onSubmit)} className={style.button}>
            {' '}
            Save
          </Button>
        </form>
      </Card>
    )
  }

  return <Navigate to="/sign-in" />
}

export default Profile
