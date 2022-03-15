import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Button, Dropdown, Menu } from 'antd'
import { Navigate, Route, Routes } from 'react-router'
import { ProjectScreen } from 'screens/project'
import { BrowserRouter } from 'react-router-dom'
import { useState } from 'react'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'
export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  return (
    <Container>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={'projects'} element={<ProjectListScreen />} />
            <Route path={'projects/:projectId/*'} element={<ProjectScreen />} />
            <Route index element={<Navigate to={'/projects'} />} />
          </Routes>
        </BrowserRouter>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      ></ProjectModal>
    </Container>
  )
}

// 重置路由
export const resetRoute = () => (window.location.href = window.location.origin)

const PageHeader = () => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button style={{ padding: 0 }} type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </Button>
        <ProjectPopover />

        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User></User>
      </HeaderRight>
    </Header>
  )
}

const User = () => {
  const { logout, user } = useAuth()

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={'logout'}>
            <Button type={'link'} onClick={logout}>
              登出
            </Button>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={'link'} onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div``

const Main = styled.main`
  height: calc(100vh - 6rem);
`
