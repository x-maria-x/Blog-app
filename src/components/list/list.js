import React from 'react'
import { Flex } from 'antd'

import ListItem from '../list-item'

function List() {
  return (
    <Flex gap="middle" vertical style={{ alignItems: 'center', margin: '20px 0' }}>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </Flex>
  )
}

export default List
