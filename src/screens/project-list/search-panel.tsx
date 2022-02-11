import { Input, Select } from 'antd'
import React from 'react'

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
    <form action="">
      <div>
        {/* setParam(Object.assign({}, param, {name: evt.target.value})) */}
        <Input
          type="text"
          value={param.name}
          onChange={(evt) => setParam({ ...param, name: evt.target.value })}
        ></Input>
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
      </div>
    </form>
  )
}
