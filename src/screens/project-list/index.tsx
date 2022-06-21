import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ButtonNoPadding, Row } from 'components/lib'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)
  const [param, setParam] = useProjectsSearchParams()
  const { open } = useProjectModal()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500))
  const { data: users } = useUser()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open}>创建项目</ButtonNoPadding>
      </Row>
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
