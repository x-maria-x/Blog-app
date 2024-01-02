import React from 'react'
import { Button, Avatar } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
//  eslint-disable-next-line import/no-extraneous-dependencies
import UserOutlined from '@ant-design/icons/UserOutlined'

import { logOut } from '../../store/userSlice'
import avatar from '../sources/img/avatar.svg'

import style from './header.module.scss'

function Header() {
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.user)

  return (
    <header className={style.header}>
      <div className={style.title}>
        <Link to="/articles">Realworld Blog</Link>
      </div>
      {user?.token ? (
        <div className={style.menu}>
          <Button danger style={{ borderColor: '#52c41a', color: '#52c41a' }}>
            <Link to="/new-article">Create article</Link>
          </Button>
          <Link to="/profile">
            <div className={style.user}>
              {user.username}
              <Avatar size={46} icon={<UserOutlined />} src={user.image} className={style.avatar}>
                <img src={avatar} alt="avatar" />
              </Avatar>
            </div>
          </Link>

          <Button danger style={{ borderColor: '#000', color: '#000' }} onClick={() => dispatch(logOut())}>
            Log Out
          </Button>
        </div>
      ) : (
        <div className={style.menu}>
          <Button type="text">
            <Link to="/sign-in">Sign In</Link>
          </Button>
          <Button danger style={{ borderColor: '#52c41a', color: '#52c41a' }}>
            <Link to="/sign-up">Sign Up</Link>
          </Button>
        </div>
      )}
    </header>
  )
}

export default Header
