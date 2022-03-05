import { List } from './list'
import { SearchPanel } from './search-panel'
import { useState } from 'react'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'
import { useUrlQueryParam } from 'utils/url'

export const ProjectListScreen = () => {
  const [, setParam] = useState({
    name: '',
    personId: '',
  })
  const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])
  const [param] = useUrlQueryParam(keys)
  useDocumentTitle('项目列表', false)
  const debouncedParam = useDebounce(param, 500)
  const { isLoading, error, data: list } = useProjects(debouncedParam)
  const { data: users } = useUser()
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users || []}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      ></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = true
const Container = styled.div`
  padding: 3.2rem;
`
