import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from '../header.js'
import List from '../list/list'
import Article from '../article'
import SignIn from '../sign-in'
import SignUp from '../sign-up'
import Profile from '../profile'
import { getUser } from '../../store/userSlice'

import style from './app.module.scss'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('Authorization'))
    if (token) dispatch(getUser(token))
  }, [dispatch])

  return (
    <div className={style.app}>
      <Header />
      <Routes>
        <Route exact path="/" element={<List />} />
        <Route exact path="/articles" element={<List />} />
        <Route path="/articles/:slug" element={<Article animate />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route />
      </Routes>
    </div>
  )
}

export default App
