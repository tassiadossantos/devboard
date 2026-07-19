import { useEffect } from 'react'
import { useStore } from '../store'

export function useGitHub() {
  const { token, user, loading, error, setToken, logout, loadAllData } =
    useStore()

  useEffect(() => {
    if (token && !user && !loading) {
      loadAllData()
    }
  }, [token, user, loading, loadAllData])

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated: !!token,
    login: setToken,
    logout,
    refresh: loadAllData,
  }
}
