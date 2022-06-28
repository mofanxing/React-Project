import { Project } from 'screens/project-list/list'
import { useHttp } from 'utils/http'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { useProjectsSearchParams } from 'screens/project-list/util'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()

  return useQuery<Project[]>(['projects', param], () =>
    client('projects', { data: param })
  )
}

//编辑
export const useEditProject = () => {
  const client = useHttp()
  const queryClient = useQueryClient()
  const [searchParams] = useProjectsSearchParams()
  const queryKey = ['projects', searchParams]
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: 'PATCH',
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      async onMutate(target: Partial<Project>) {
        const previousItems = queryClient.getQueryData(queryKey)
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          )
        })
        return { previousItems }
      },
      onError(error: any, newItem: any, context: any) {
        queryClient.setQueryData(queryKey, context.previousItems)
      },
    }
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
