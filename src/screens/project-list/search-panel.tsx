/** @jsxImportSource @emotion/react */
import { Form, Input } from 'antd'
import { UserSelect } from 'components/user-select'
import { Project } from './list'

export interface User {
  id: number
  name: string
  email: string
  title: string
  organization: string
  token: string
}
interface SearchPanelTypes {
  users: User[]
  param: Partial<Pick<Project, 'name' | 'personId'>>
  setParam: (param: SearchPanelTypes['param']) => void
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelTypes) => {
  return (
    <Form css={{ marginBottom: '2rem', '> *': '' }} layout={'inline'}>
      <Form.Item>
        {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
        <Input
          type="text"
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        ></Input>
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={'负责人'}
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        ></UserSelect>
      </Form.Item>
    </Form>
  )
}
