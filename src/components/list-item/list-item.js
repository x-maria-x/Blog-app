import React from 'react'
import { Card, Tag, Avatar } from 'antd'

import heart from '../sources/img/heart.svg'

import style from './list-item.module.scss'

function ListItem() {
  return (
    <Card style={{ width: '80%' }}>
      <header className={style.header}>
        <div className="article">
          <div className={style.article_info}>
            <span className={style.title}>Some article title</span>
            <span className={style.likes}>
              <img src={heart} alt="like" className={style.heart} />
              <span className={style.likesCount}>12</span>
            </span>
          </div>

          <div className={style.tags}>
            <Tag style={{ backgroundColor: 'white' }}>Tag 1</Tag>
            <Tag style={{ backgroundColor: 'white' }}>Tag 2</Tag>
          </div>
        </div>
        <div className={style.user}>
          <div className={style.user_info}>
            <div className={style.user_name}>John Doe</div>
            <div className={style.user_date}>March 5, 2020 </div>
          </div>

          <Avatar
            size={64}
            icon={
              <img
                alt="avatar"
                src="https://w7.pngwing.com/pngs/980/886/png-transparent-male-portrait-avatar-computer-icons-icon-design-avatar-flat-face-icon-people-head-cartoon.png"
              />
            }
          />
        </div>
      </header>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat.{' '}
      </p>
    </Card>
  )
}

export default ListItem
