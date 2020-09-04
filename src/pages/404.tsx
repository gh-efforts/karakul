import React from 'react'
import ActionButton from '../components/action-button'
import Link from 'next/link'

export default function NotFound(): JSX.Element {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src='/images/404.svg' alt='404' />
      <h1 style={{ marginTop: 30, marginBottom: 80, fontSize: 48, lineHeight: '59px' }}>Looks like you get lost</h1>
      <Link href='/'>
        <ActionButton>Back Home</ActionButton>
      </Link>
    </div>
  )
}
