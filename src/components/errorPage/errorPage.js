import React from 'react'
import { Alert } from 'antd'

function ErrorPage() {
  return (
    <Alert
      message="The page was not found!"
      type="error"
      style={{ width: '80%', margin: '40px auto', height: 80, textAlign: 'center' }}
    />
  )
}

export default ErrorPage
