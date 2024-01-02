import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Header from '../header.js'
import List from '../list/list'
import Article from '../article'
import SignIn from '../sign-in'
import SignUp from '../sign-up'
import Profile from '../profile'
import NewArticle from '../new-article'
import EditArticle from '../edit-article'
import ErrorPage from '../errorPage'
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
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new-article" element={<NewArticle />} />
        <Route path="/articles/:slug/edit" element={<EditArticle />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  )
}

export default App
