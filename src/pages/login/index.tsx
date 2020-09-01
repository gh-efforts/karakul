import React, { useEffect } from 'react'
import Link from 'next/link'
import getConfig from 'next/config'
import { useRouter } from 'next/router'

import { setLocalCookie, setLocalStorage } from '../../helpers/cookie'

export default function Login(): React.ReactElement {
  const {
    publicRuntimeConfig: { ENDPOINT },
  } = getConfig()

  const router = useRouter()

  const backendUrl = ENDPOINT

  useEffect(() => {
    const callback = router.asPath.split('?')
    fetch(`${backendUrl}/auth/feishu/callback?${callback[1]}`)
      .then(res => {
        if (res.status !== 200) {
          throw new Error(`Couldn't login to Strapi. Status: ${res.status}`)
        }
        return res
      })
      .then(res => res.json())
      .then(res => {
        setLocalCookie('Authorization', `Bearer${res.jwt}` || '')
        setLocalStorage('user', JSON.stringify(res.user) || '')
        setLocalStorage('userId', res.user.id || '')
        setTimeout(() => router.push('/'), 3000) // Redirect to homepage after 3 sec
      })
      .catch(err => {
        console.log(err)
      })
  }, [router, backendUrl])

  return (
    <div>
      <Link href={`${backendUrl}/connect/feishu`}>
        <span>飞书登录</span>
      </Link>
    </div>
  )
}
