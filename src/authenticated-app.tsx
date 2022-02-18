import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import styled from '@emotion/styled'
import { Row } from 'components/lib'
import { Button, Dropdown, Menu } from 'antd'
import { Route, Routes } from 'react-router'
import { ProjectScreen } from 'screens/project'
import { BrowserRouter } from 'react-router-dom'
export const AuthenticatedApp = () => {
  return (
    <Containdr>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path={'projects'} element={<ProjectListScreen />} />
            <Route path={'projects/:projectId/*'} element={<ProjectScreen />} />
            <Route index element={<ProjectListScreen />} />
          </Routes>
        </BrowserRouter>
      </Main>
    </Containdr>
  )
}

const PageHeader = () => {
  const { logout, user } = useAuth()
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        <h2>Logo</h2>
        <h2>项目</h2>
        <h2>用户</h2>
      </HeaderLeft>
      <HeaderRight>
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
      </HeaderRight>
    </Header>
  )
}

const Containdr = styled.div`
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
