import { ApolloClient, InMemoryCache, ApolloLink, createHttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import Cookies from 'js-cookie'
import getConfig from 'next/config'
import NProgress from 'nprogress'
import Hash from 'object-hash'
import { message as Message } from '../components'
const {
  publicRuntimeConfig: { ENDPOINT },
} = getConfig()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const trim = (variables: any) => {
  if (variables === null) {
    return undefined
  }

  if (typeof variables === 'string') {
    return variables.trim()
  }

  if (typeof variables === 'object') {
    Object.keys(variables).forEach(k => {
      variables[k] = trim(variables[k])
    })

    return variables
  }
  return variables
}

// trim request variables
const trimLink = new ApolloLink((operation, forward) => {
  // eslint-disable-next-line no-param-reassign
  operation.variables = trim(operation.variables)

  return forward(operation)
})

// check request Authorization
const tokenLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: operation.variables.Authorization || Cookies.get('Authorization'),
    },
  })
  return forward(operation)
})

const initialLink = createHttpLink({ uri: ENDPOINT, fetch, credentials: 'same-origin' })

const processLink = new ApolloLink((operation, forward) => {
  if (typeof window !== 'undefined') {
    NProgress.start()
    return forward(operation).map(res => {
      if (res.data) {
        NProgress.done()
      }
      return res
    })
  }
  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      Message.error(message)
      if (message.includes('先登录')) {
        return false
      }
      return false
    })
  }

  forward(operation)
})

// set cache
const cache = new InMemoryCache({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataIdFromObject: (object: any) => {
    return Hash(object)
  },
})

// https://github.com/apollographql/apollo-cache-persist#how-do-i-wait-for-the-cache-to-be-restored-before-rendering-my-app

// client for base feature
const client = new ApolloClient({
  cache,
  link: ApolloLink.from([errorLink, tokenLink, processLink, trimLink, initialLink]),
})
export default client
