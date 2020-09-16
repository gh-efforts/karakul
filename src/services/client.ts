import { GraphQLClient } from 'graphql-request'
import getConfig from 'next/config'
const {
  publicRuntimeConfig: { ENDPOINT },
} = getConfig()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const trim = (variables: any) => {
//   if (variables === null) {
//     return undefined
//   }

//   if (typeof variables === 'string') {
//     return variables.trim()
//   }

//   if (typeof variables === 'object') {
//     Object.keys(variables).forEach(k => {
//       variables[k] = trim(variables[k])
//     })

//     return variables
//   }
//   return variables
// }

const NClient = new GraphQLClient(`${ENDPOINT}/graphql`, {
  headers: {
    Authorization: typeof window === 'undefined' ? '' : window.localStorage.getItem('Authorization') || '',
  },
})

export { NClient }
