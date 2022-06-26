// https://testing-library.com/docs/react-testing-library/setup
import React, {FC, ReactElement, ReactNode} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import { RouteProvider } from '@/provider'
import {PageProps} from '@/libs'

export const Providers: FC<{children: ReactNode}> = ({children}) => {
    const pageProps: PageProps = {
        __APOLLO_STATE__: {}
    }
    return (
        <RouteProvider pageProps={pageProps}>{children}</RouteProvider>
    )
}

const customRender = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>,
  ) => render(ui, {wrapper: Providers, ...options})
  
export * from '@testing-library/react'
export {customRender as render}