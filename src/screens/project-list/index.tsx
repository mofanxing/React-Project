import React from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from 'utils'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])
  const debouncedParam = useDebounce(param, 500)
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    // eslint-disable-next-line
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <div>
      <SearchPanel
        param={param}
        setParam={setParam}
        users={users}
      ></SearchPanel>
      <List list={list} users={users}></List>
    </div>
  )
}
