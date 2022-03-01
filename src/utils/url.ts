import { useSearchParams } from 'react-router-dom'

/**
 * 返回页面url中，指定键的参数值
 */
//此处类型有问题
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  return [
    keys.reduce((prev: K, key: K) => {
      return { ...prev, [key]: searchParams.get(key) || '' }
    }, {} as { [key in K]: string }),
    setSearchParams,
  ] as const
}
