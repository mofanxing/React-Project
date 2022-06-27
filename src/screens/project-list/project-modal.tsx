import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useProjectModal } from './util'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal()
  const title = editingProject ? '编辑项目' : '创建项目'
  const onFinish = () => {}
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
      {isLoading ? (
        <Spin size={'large'}></Spin>
      ) : (
        <>
          <h1>{title}</h1>
          <Form
            layout={'vertical'}
            style={{ width: '40rem' }}
            onFinish={onFinish}
          >
            <Form.Item
              label={'名称'}
              name={'name'}
              rules={[{ required: true, message: '请输入项目名称' }]}
            >
              <Input placeholder={'请输入项目名称'}></Input>
            </Form.Item>
          </Form>
        </>
      )}
      <h1>project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
