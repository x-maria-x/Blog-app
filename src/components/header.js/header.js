import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import style from './header.module.scss'

function Header() {
  return (
    <header className={style.header}>
      <div className={style.title}>
        <Link to="/articles">Realworld Blog</Link>
      </div>
      <div className={style.menu}>
        <Button type="text">Sign In</Button>
        <Button danger style={{ borderColor: '#52c41a', color: '#52c41a' }}>
          Sign Up
        </Button>
      </div>
    </header>
  )
}

export default Header
