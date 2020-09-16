import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { getLocalStore } from '../../helpers/cookie'

export default function useAuth(checkAuth = true) {
  const router = useRouter()

  useEffect(() => {
    let flag = true
    try {
      const auth = getLocalStore('Authorization')
      const user = getLocalStore('user')
      const userId = getLocalStore('userId')
      flag = !!auth && !!user && !!userId
    } catch {
      flag = true
    }

    if (checkAuth && !flag) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkAuth])
}
