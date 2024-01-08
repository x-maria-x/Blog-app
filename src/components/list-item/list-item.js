import { React, useState } from 'react'
import { Card, Tag, Avatar, Button, Popconfirm, App } from 'antd'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//  eslint-disable-next-line import/no-extraneous-dependencies
import UserOutlined from '@ant-design/icons/UserOutlined'

import heart from '../sources/img/heart.svg'
import heartLike from '../sources/img/heart+.svg'
import { deleteArticle, favoriteArticle, unfavoriteArticle } from '../../store/articlesSlice'

import style from './list-item.module.scss'

function ListItem({
  author,
  createdAt,
  favorited,
  favoritesCount,
  description,
  tagList,
  title,
  slug,
  body,
  fullArticle,
}) {
  const dispatch = useDispatch()
  const { message } = App.useApp()

  const { user } = useSelector((state) => state.user)
  const [isLike, setIsLike] = useState(favorited)
  const [likeCount, setLikeCount] = useState(favoritesCount)
  const formatDate = format(new Date(createdAt), 'MMMM dd, yyyy')

  function shortenText(text, maxLength) {
    const newText = text?.trim()
    if (!newText) return null
    if (newText.length <= maxLength) return newText

    let shortenedText = newText.slice(0, maxLength)

    const lastSpaceIndex = shortenedText.lastIndexOf(' ')

    if (lastSpaceIndex !== -1) {
      shortenedText = shortenedText.slice(0, lastSpaceIndex)
    }

    return `${shortenedText}...`
  }

  const tagsList = tagList?.map((tag, index) => {
    if (tag?.trim() === '') return null

    return (
      // eslint-disable-next-line react/no-array-index-key
      <span className={style.tag} key={index}>
        <Tag style={{ backgroundColor: 'white' }}>{shortenText(tag, 30)}</Tag>
      </span>
    )
  })

  function onFavorite() {
    if (!user.token) {
      message.error('You are not logged in!')
      return
    }
    if (!isLike) {
      dispatch(favoriteArticle(slug))
      setLikeCount((l) => l + 1)
    } else {
      dispatch(unfavoriteArticle(slug))
      setLikeCount((l) => l - 1)
    }
    setIsLike(!isLike)
  }

  const onDelete = () => {
    dispatch(deleteArticle(slug))
  }

  return (
    <Card style={{ width: '80%', margin: '0 auto' }} className={style.card}>
      <header className={style.header}>
        <div className="article">
          <div className={style.article_info}>
            <span className={style.title}>
              <Link key={slug} to={`/articles/${slug}`}>
                {shortenText(title, 80)}
              </Link>
            </span>
            <span className={style.likes}>
              {isLike ? (
                <button onClick={onFavorite} type="button" className={style.button}>
                  <img src={heartLike} alt="like" className={style.heart} />{' '}
                </button>
              ) : (
                <button onClick={onFavorite} type="button" className={style.button}>
                  <img src={heart} alt="like" className={style.heart} />
                </button>
              )}

              <span className={style.likesCount}>{likeCount}</span>
            </span>
          </div>

          <div className={style.tags}>{tagsList}</div>
        </div>
        <div className={style.user}>
          <div className={style.user_info}>
            <div className={style.user_name}>{author.username}</div>
            <div className={style.user_date}>{formatDate}</div>
          </div>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            src={author.image}
            style={{
              minWidth: 64,
              backgroundColor: '#fff',
              color: 'rgba(0,0,0,3)',
              borderColor: 'rgba(0,0,0,0.2)',
            }}
          />
        </div>
      </header>
      <div className={style.description}>
        {description.trim() !== '' && (
          // <>
          <Markdown>{shortenText(description, 250)}</Markdown>
        )}
        {fullArticle && user.username === author.username && (
          <div className={style.buttons}>
            <Popconfirm
              title="Delete the article"
              description="Are you sure to delete this article??"
              onConfirm={onDelete}
              okText="Yes"
              cancelText="No"
            >
              <Button danger style={{ borderColor: '#F5222D', color: '#F5222D' }}>
                Delete
              </Button>
            </Popconfirm>
            <Button danger style={{ borderColor: '#52c41a', color: '#52c41a' }}>
              <Link to={`/articles/${slug}/edit`}>Edit</Link>
            </Button>
          </div>
        )}
        {/* </> */}
      </div>
      <div>{fullArticle && body.trim() !== '' && <Markdown>{body}</Markdown>}</div>
    </Card>
  )
}

export default ListItem
