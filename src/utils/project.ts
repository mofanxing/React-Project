import { useCallback, useEffect } from 'react'
import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useAsync } from 'utils/use-async'
import { useHttp } from 'utils/http'

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp()
  const { run, ...result } = useAsync<Project[]>()

  const fetchProjects = useCallback(
    () => client('projects', { data: cleanObject(param || {}) }),
    [client, param]
  )
  // 使用useCallback解决加入依赖无限渲染问题
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    })
  }, [param, run, fetchProjects])
  return result
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
