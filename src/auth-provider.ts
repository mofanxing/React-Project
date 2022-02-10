import { User } from 'screens/project-list/search-panel'
const localStorageKey = '__auth_provider_token__'
const apiUrl = process.env.REACT_APP_API_URL

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || '')
  return user
}

export const login = (data: { username: string; passowrd: string }) => {
  fetch(`${apiUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      handleUserResponse(await response.json())
    }
  })
}

export const regsiter = (data: { username: string; passowrd: string }) => {
  fetch(`${apiUrl}/regsiter`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      handleUserResponse(await response.json())
    }
  })
}

export const logout = () => window.localStorage.removeItem(localStorageKey)
