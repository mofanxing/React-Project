import { useEffect } from 'react'

export const isFalsy = (value) => (value === 0 ? false : !value)
export const cleanObject = (object) => {
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback) => {
  useEffect(() => {
    callback()
  }, [])
}

export const debounce = (func, delay) => {
  let timeout
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(function () {
      func(...param)
    }, delay)
  }
}
