import { Project } from 'screens/project-list/list'

import { useAsync } from 'utils/use-async'
import { useHttp } from 'utils/http'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[]>(['projects', param], () =>
    client('projects', { data: param })
  )
}

export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  )
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
