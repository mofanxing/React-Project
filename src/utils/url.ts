import { useSearchParams } from 'react-router-dom'

/**
 * 返回页面url中，指定键的参数值
 */

//fix
export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    keys.reduce((prev: {}, key: string) => {
      return { ...prev, [key]: searchParams.get(key) }
    }, {}),
    setSearchParams,
  ] as const
}
