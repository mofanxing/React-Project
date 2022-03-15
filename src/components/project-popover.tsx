import { List, Popover, Typography } from 'antd'
import { useProjects } from 'utils/project'

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects()
  const pinnedProjects = projects?.filter((project) => project.pin)

  const content = (
    <div>
      <Typography.Text type={'secondary'}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name}></List.Item.Meta>
          </List.Item>
        ))}
      </List>
    </div>
  )
  return (
    <Popover placement={'bottom'} content={content}>
      <span>项目</span>
    </Popover>
  )
}
