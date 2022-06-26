import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {RouteProvider} from '@/provider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouteProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </RouteProvider>
  )
}

export default MyApp
