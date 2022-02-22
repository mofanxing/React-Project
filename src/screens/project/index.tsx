import { Link } from 'react-router-dom'
import { Route, Routes } from 'react-router'
import { EpicScreen } from 'screens/Epic'
import { KanbanScreen } from 'screens/Kanban'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={'kanban'}>看板</Link>
      <Link to={'epic'}>任务组</Link>
      <Routes>
        <Route path={'/kanban'} element={<KanbanScreen />}></Route>
        <Route path={'/epic'} element={<EpicScreen />}></Route>
        <Route index element={<KanbanScreen />}></Route>
      </Routes>
    </div>
  )
}
