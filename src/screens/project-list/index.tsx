import { List } from './list'
import { SearchPanel } from './search-panel'
import { useDebounce, useDocumentTitle } from 'utils'
import styled from '@emotion/styled'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUser } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { Row } from 'components/lib'

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void
}) => {
  useDocumentTitle('项目列表', false)
  const [param, setParam] = useProjectsSearchParams()
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500))
  const { data: users } = useUser()
  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
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
        setProjectModalOpen={props.setProjectModalOpen}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        refresh={retry}
      ></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = true
const Container = styled.div`
  padding: 3.2rem;
`
