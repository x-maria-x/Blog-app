import React, { useCallback, useEffect } from 'react'
import { Card, Alert } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Navigate, useParams } from 'react-router-dom'

import ArticleForm from '../article-form'
import { fetchArticle } from '../../store/articlesSlice'
import { clearError } from '../../store/userSlice'

import style from './edit-article.module.scss'

function EditArticle() {
  const dispatch = useDispatch()
  const params = useParams()
  const { article } = useSelector((state) => state.articles)
  const { error } = useSelector((state) => state.articles)
  const { user } = useSelector((state) => state.user)
  const { status } = useSelector((state) => state.articles)

  useEffect(() => {
    const { slug } = params
    dispatch(fetchArticle(slug))
  }, [params, dispatch])

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

  if (user?.token) {
    return (
      <Card className={style.card}>
        {error && (
          <Alert message={error} type="error" style={{ width: '80%', margin: '20px auto', textAlign: 'center' }} />
        )}
        <p className={style.title}>Edit article</p>
        {status === 'fulfilled' && (
          <Alert
            message="The article has been successfully edited!"
            type="success"
            style={{ width: '80%', margin: '20px auto', textAlign: 'center' }}
          />
        )}
        <ArticleForm article={article} />
      </Card>
    )
  }

  return <Navigate to="/sign-in" />
}

export default EditArticle
