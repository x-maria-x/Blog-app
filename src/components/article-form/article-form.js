import React, { useCallback, useEffect } from 'react'
import { Button, Alert } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useFieldArray, useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { createArticle, updateArticle } from '../../store/articlesSlice'

import style from './article-form.module.scss'

function ArticleForm({ article }) {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)
  const { error } = useSelector((state) => state.articles)

  const tags = article?.tagList?.map((tag) => ({
    name: tag,
  }))

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    control,
  } = useForm({ mode: 'onBlur', defaultValues: { tagList: tags } })

  const { fields, append, remove } = useFieldArray({
    name: 'tagList',
    control,
  })

  function onSubmitForm(data) {
    const tagListArr = data?.tagList?.map((item) => Object.values(item)).reduce((accum, el) => accum.concat(el), [])
    const dataToSend = { article: { ...data, tagList: tagListArr } }
    if (article) {
      dispatch(updateArticle({ dataToSend, slug: article.slug }))
    } else dispatch(createArticle(dataToSend))
  }

  const getError = useCallback(() => {
    const errorObj = JSON.parse(error).errors
    const er = Object.entries(errorObj)
    const message = er.map((el) => el.join(' - ')).join(' ')

    return message
  }, [error])

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
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={style.inputWrapper}>
        <div>Title</div>

        <input
          defaultValue={article?.title}
          placeholder="Title"
          {...register('title', {
            required: 'Title is required!',
          })}
        />
        <div className={style.textError}>{errors?.title && (errors?.title?.message || 'Error!!!')}</div>
      </div>

      <div className={style.inputWrapper}>
        <div>Short description</div>
        <input
          defaultValue={article?.description}
          placeholder="Description"
          {...register('description', {
            required: 'Description is required!',
          })}
        />
        <div className={style.textError}>{errors?.description && (errors?.description?.message || 'Error!!!')}</div>
      </div>

      <div className={style.inputWrapper}>
        <div>Text</div>
        <textarea
          defaultValue={article?.body}
          placeholder="Text"
          {...register('body', {
            required: 'Text is required!',
          })}
        />
        <div className={style.textError}>{errors?.body && (errors?.body?.message || 'Error!!!')}</div>
      </div>

      <div className={style.inputWrapper}>
        <div>Tags</div>
        <div className={style.tags}>
          {fields.map((field, index) => (
            <div key={field.id}>
              <input
                placeholder="Tag"
                {...register(`tagList.${index}.name`, {
                  maxLength: { value: 30, message: 'Your tag must contain no more than 30 characters.' },
                  required:
                    "Tag is required! If you don't want to provide the Tag, please delete the tag before sending form!",
                })}
                style={{ width: '30%', marginRight: 10 }}
              />
              <Button
                danger
                style={{ backgroundColor: '#fff', borderColor: '#F5222D', color: '#F5222D', width: '20%' }}
                htmlType="button"
                onClick={() => remove(index)}
                className={style.button}
              >
                Delete
              </Button>
            </div>
          ))}
          <Button
            danger
            className={style.button}
            htmlType="button"
            style={{ backgroundColor: '#fff', borderColor: '#1890FF', color: '#1890FF', width: '20%' }}
            onClick={() => {
              append({
                name: '',
              })
            }}
          >
            Add tag
          </Button>
        </div>
      </div>

      {error && (
        <Alert message={getError()} type="error" style={{ width: '80%', margin: '20px auto', textAlign: 'center' }} />
      )}

      <Button type="submit" onClick={handleSubmit(onSubmitForm)} className={style.button}>
        Send
      </Button>
    </form>
  )
}

export default ArticleForm
