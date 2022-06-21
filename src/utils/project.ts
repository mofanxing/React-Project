import { Project } from 'screens/project-list/list'

import { useAsync } from 'utils/use-async'
import { useHttp } from 'utils/http'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
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
