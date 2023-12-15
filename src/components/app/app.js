import React from 'react'
import { Pagination, ConfigProvider } from 'antd'

import Header from '../header.js'
import List from '../list/list'

import style from './app.module.scss'

function App() {
  return (
    <div className={style.app}>
      <Header />
      <List />
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: 'rgb(24, 144, 255)',
              colorPrimary: 'rgb(255, 255, 255)',
              colorPrimaryHover: 'rgb(255, 255, 255)',
            },
          },
        }}
      >
        <Pagination total={50} showSizeChanger={false} style={{ textAlign: 'center', paddingBottom: '20px' }} />
      </ConfigProvider>
    </div>
  )
}

export default App
