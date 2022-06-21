import { Project } from 'screens/project-list/list'

import { useAsync } from 'utils/use-async'
import { useHttp } from 'utils/http'
import { useQuery } from 'react-query'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[]>(['projects', param], () =>
    client('projects', { data: param })
  )
}

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'PATCH',
      })
    )
  }
  return {
    mutate,
    ...asyncResult,
  }
}

export const useAdditProject = () => {
  const { run, ...asyncResult } = useAsync()
  const client = useHttp()
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: 'POST',
      })
    )
  }
  return {
    mutate,
    ...asyncResult,
  }
}
