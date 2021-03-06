// https://github.com/vercel/next.js/blob/canary/examples/with-apollo/lib/apolloClient.js
import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache, from, NormalizedCacheObject} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { concatPagination } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import { fetch } from 'cross-fetch'
import { API_URL } from '@/config'

/**
 * @summary getStaticProps or getServerSideProps key name
 * @type {'__APOLLO_STATE__'}
 */
export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'
/**
 * @summary getStaticProps or getServerSideProps type
 * @type {'__APOLLO_STATE__'}
 */
export type PageProps = {
  __APOLLO_STATE__: any
} & {
  [key: string]: any
}

/**
 * @type {ApolloClient}
 */
let apolloClient: ApolloClient<NormalizedCacheObject>

/**
 * @summary エラー操作
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

/**
 * @summary アクセス先設定
 * @type {HttpLink}
 */
const httpLink = new HttpLink({
  uri: API_URL, // Server URL (must be absolute)
  credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
  fetch
})

/**
 * @summary Initialize apollo client
 * @return {ApolloClient} 
 */
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  })
}

/**
 * @summary Merge getStaticProps or getServerSideProps to appllo initialState
 * @param initialState 
 * @returns 
 */
export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the initialState from getStaticProps/getServerSideProps in the existing cache
    const data = merge(existingCache, initialState, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

/**
 * @summary Create appllo state in getStaticProps or getServerSideProps
 */
export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: any) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }
  return pageProps
}

/**
 * @summary hooks appolo client
 * @param {PageProps} pageProps 
 * @returns {ApolloClient} 
 */
export function useApollo(pageProps: PageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}