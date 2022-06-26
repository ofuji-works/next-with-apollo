import {ReactNode} from 'react'
import {ApolloProvider} from '@apollo/client'
import { useApollo } from '@/libs'

type Props = {
    children: ReactNode
    pageProps: any
}

export const RouteProvider = ({children, pageProps}: Props) => {
    const client = useApollo(pageProps)
    return <ApolloProvider client={client}>{children}</ApolloProvider>
}
