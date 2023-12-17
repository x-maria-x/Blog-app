import React from 'react'
import { Card, Tag, Avatar } from 'antd'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import { Link } from 'react-router-dom'

import heart from '../sources/img/heart.svg'
import heartLike from '../sources/img/heart+.svg'

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
  const formatDate = format(new Date(createdAt), 'MMMM dd, yyyy')
  const tagsList = tagList.map((tag) => (
    <span className="tag" key={tag}>
      <Tag style={{ backgroundColor: 'white' }}>{tag}</Tag>
    </span>
  ))

  return (
    <Card style={{ width: '80%', margin: '0 auto' }} className={style.card}>
      <header className={style.header}>
        <div className="article">
          <div className={style.article_info}>
            <span className={style.title}>
              <Link key={slug} to={`/articles/${slug}`}>
                {title}
              </Link>
            </span>
            <span className={style.likes}>
              {favorited ? (
                <img src={heartLike} alt="like" className={style.heart} />
              ) : (
                <img src={heart} alt="like" className={style.heart} />
              )}

              <span className={style.likesCount}>{favoritesCount}</span>
            </span>
          </div>

          <div className={style.tags}>{tagsList}</div>
        </div>
        <div className={style.user}>
          <div className={style.user_info}>
            <div className={style.user_name}>{author.username}</div>
            <div className={style.user_date}>{formatDate}</div>
          </div>

          <Avatar size={64} icon={<img alt="avatar" src={author.image} />} />
        </div>
      </header>
      <div>
        <Markdown>{description}</Markdown>
      </div>
      <div>{fullArticle && <Markdown>{body}</Markdown>}</div>
    </Card>
  )
}

export default ListItem
