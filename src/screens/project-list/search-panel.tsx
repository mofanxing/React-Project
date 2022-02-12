/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from 'antd'

export interface User {
  id: string
  name: string
  email: string
  title: string
  organization: string
  token: string
}
interface SearchPanelTypes {
  users: User[]
  param: {
    name: string
    personId: string
  }
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
        <Select
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <Select.Option value={''}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
}
