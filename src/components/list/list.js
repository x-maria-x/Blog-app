import React, { useEffect, useState } from 'react'
import { Flex, Pagination, ConfigProvider, Spin, Alert } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { fetchArticles, pageChange } from '../../store/articlesSlice'
import ListItem from '../list-item'

function List() {
  const dispatch = useDispatch()
  const [articlesList, setArticlesList] = useState([])
  const { articles } = useSelector((state) => state.articles)
  const { loading } = useSelector((state) => state.articles)
  const { error } = useSelector((state) => state.articles)
  const { currentPage } = useSelector((state) => state.articles)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [dispatch])

  useEffect(() => {
    const art = articles.articles
    const list = art?.map((props) => <ListItem key={props.slug} {...props} />)
    setArticlesList(list)
  }, [articles, setArticlesList, loading])

  const handlePageChange = (page) => {
    dispatch(fetchArticles(page * 5 - 5))
    dispatch(pageChange(page))
  }

  return (
    <>
      {error && (
        <Alert message={error} type="error" style={{ width: '80%', margin: '20px auto', textAlign: 'center' }} />
      )}
      {loading && <Spin size="large" style={{ marginTop: '150px', marginLeft: '50%' }} />}
      {articlesList && (
        <>
          <Flex gap="middle" vertical style={{ alignItems: 'center', margin: '20px 0' }}>
            {articlesList}
          </Flex>
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
            <Pagination
              total={articles.articlesCount}
              current={currentPage}
              defaultPageSize={5}
              showSizeChanger={false}
              style={{ textAlign: 'center', paddingBottom: '20px' }}
              onChange={(page) => handlePageChange(page)}
            />
          </ConfigProvider>
        </>
      )}
    </>
  )
}

export default List
