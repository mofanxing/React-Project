import { Project } from 'screens/project-list/list'
import { useHttp } from 'utils/http'
import { QueryKey, useMutation, useQuery, useQueryClient } from 'react-query'
import { useEditConfig } from './use-optimistic-options'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[]>(['projects', param], () =>
    client('projects', { data: param })
  )
}

//编辑
export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    useEditConfig(queryKey)
  )
}
//新建
export const useAdditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: 'POST',
      }),
    {
      onSuccess: () => queryClient.invalidateQueries('projects'),
    }
  )
}

//获取详情
export const useProject = (id?: number) => {
  const client = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => client(`projects/${id}`),
    {
      enabled: !!id,
    }
  )
}
