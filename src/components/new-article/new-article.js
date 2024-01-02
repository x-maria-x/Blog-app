import React, { useCallback, useEffect } from 'react'
import { Card, Alert } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import ArticleForm from '../article-form'
import { clearError } from '../../store/userSlice'

import style from './new-article.module.scss'

function NewArticle() {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.articles)
  const { status } = useSelector((state) => state.articles)

  const { setError } = useForm({ mode: 'onBlur' })

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

      if (errorObj.title) {
        setError('title', {
          type: 'server',
          message: 'Something went wrong with title',
        })
      }
      if (errorObj.description) {
        setError('description', {
          type: 'server',
          message: 'Something went wrong with description',
        })
      }
      if (errorObj.text) {
        setError('text', {
          type: 'server',
          message: 'Something went wrong with text',
        })
      }
      if (errorObj.tagList) {
        setError('tagList', {
          type: 'server',
          message: 'Something went wrong with tags',
        })
      }
    }
  }, [error, setError, getError])

  if (!user?.token) {
    return <Navigate to="/sign-in" />
  }

  return (
    <Card className={style.card}>
      <p className={style.title}>Create new article</p>
      {status === 'fulfilled' && (
        <Alert
          message="The article has been successfully edited!"
          type="success"
          style={{ width: '80%', margin: '20px auto', textAlign: 'center' }}
        />
      )}
      <ArticleForm />
    </Card>
  )
}

export default NewArticle
