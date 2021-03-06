import { useMemo } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject } from 'utils'

/**
 * 返回页面url中，指定键的参数值
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    useMemo(() => {
      return keys.reduce((prev: { [key in K]: string }, key: K) => {
        return { ...prev, [key]: searchParams.get(key) || '' }
      }, {} as { [key in K]: string })
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as unknown as URLSearchParams
      return setSearchParams(o)
    },
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit
    return setSearchParam(o)
  }
}
