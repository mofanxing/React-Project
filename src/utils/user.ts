import { useEffect } from 'react'
import { User } from 'screens/project-list/search-panel'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useUser = (param?: Partial<User>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<User[]>()

  useEffect(() => {
    run(client('projects', { data: cleanObject(param || {}) }))

    // eslint-disable-next-line
  }, [param])
  return result
}
