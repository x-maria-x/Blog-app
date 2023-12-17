import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Alert } from 'antd'

import { fetchArticle } from '../../store/articlesSlice'
import ListItem from '../list-item'

import style from './article.module.scss'

function Article() {
  const dispatch = useDispatch()
  const params = useParams()
  const { article } = useSelector((state) => state.articles)
  const { loading } = useSelector((state) => state.articles)
  const { error } = useSelector((state) => state.articles)

  useEffect(() => {
    const { slug } = params
    dispatch(fetchArticle(slug))
  }, [params, dispatch])

  return (
    <div className={style.article_wrapper}>
      {error && (
        <Alert message={error} type="error" style={{ width: '80%', margin: '20px auto', textAlign: 'center' }} />
      )}
      {loading && <Spin size="large" style={{ marginTop: '150px', marginLeft: '50%' }} />}
      {article && <ListItem {...article} fullArticle />}
    </div>
  )
}

export default Article
