import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ErrorBox } from 'components/lib'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useAdditProject, useEditProject } from 'utils/project'
import { useProjectModal } from './util'

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal()
  const title = editingProject ? '编辑项目' : '创建项目'
  const useMutateProject = editingProject ? useEditProject : useAdditProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject()

  const [form] = useForm()
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={'100%'}>
      {isLoading ? (
        <Spin size={'large'}></Spin>
      ) : (
        <>
          <h1>{title}</h1>
          <ErrorBox error={error}></ErrorBox>
          <Form
            layout={'vertical'}
            style={{ width: '40rem' }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label={'名称'}
              name={'name'}
              rules={[{ required: true, message: '请输入项目名称' }]}
            >
              <Input placeholder={'请输入项目名称'}></Input>
            </Form.Item>
            <Form.Item
              label={'部门'}
              name={'organization'}
              rules={[{ required: true, message: '请输入部门名称' }]}
            >
              <Input placeholder={'请输入部门名称'}></Input>
            </Form.Item>
            <Form.Item label={'负责人'} name={'personId'}>
              <UserSelect defaultOptionName={'负责人'}></UserSelect>
            </Form.Item>
            <Form.Item>
              <Button
                loading={mutateLoading}
                type={'primary'}
                htmlType={'submit'}
              >
                提交
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
      <h1>project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
