import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Header from '../header.js'
import List from '../list/list'
import Article from '../article'

import style from './app.module.scss'

function App() {
  return (
    <div className={style.app}>
      <Header />
      <Routes>
        <Route path="/" element={<List />} />
        <Route exact path="/articles" element={<List />} />
        <Route path="/articles/:slug" element={<Article animate />} />
        <Route />
      </Routes>
    </div>
  )
}

export default App
