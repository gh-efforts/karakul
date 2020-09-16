import React, { useEffect, useState } from 'react'
import { Avatar, Button } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

import { getLocalStore, clearLocalStorage } from '../../../helpers/cookie'
import { Svg } from '../../../components'
import styles from './index.module.scss'

export interface User {
  username: string
  avatar: string
  id: string
}
function KHeader(): React.ReactElement {
  const router = useRouter()
  const onLogout = () => {
    clearLocalStorage()
    router.replace('/login')
  }
  const [user, setUser] = useState<User>({
    username: '',
    avatar: '',
    id: '',
  })

  useEffect(() => {
    try {
      const user: User = JSON.parse(getLocalStore('user') || '')
      setUser(user)
    } catch {}
  }, [])

  return (
    <div className={styles.header}>
      <div className={styles.user}>
        {user?.avatar ? (
          <Avatar size={32} src={user?.avatar} alt='avatar' />
        ) : (
          <Avatar size={32} icon={<UserOutlined />} alt='avatar' />
        )}
        <span>{user?.username}</span>
        <Button
          className={styles.logout}
          type='text'
          icon={<Svg name='btn-logout-h' color='#B0B7BD' />}
          onClick={onLogout}
        ></Button>
      </div>
    </div>
  )
}

export default KHeader
