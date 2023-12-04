import '~styles/global.css'
import dynamic from 'next/dynamic'
import { StrictMode, useEffect } from 'react'
import type { ReactNode, ReactElement } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import 'nprogress/nprogress.css'
import '~styles/nprogress.css'
import { useRouter } from 'next/router'
import { useShallow } from 'zustand/react/shallow'
import Script from 'next/script'
import { interFont } from '~utils/next-font'
import { LazyMotion, domAnimation } from 'framer-motion'
import { useAuthStore } from '../store/auth'
import { SidebarContextProvider } from '../context/app/sidebar'

const Header = dynamic(() => import('~cpn/Header').then((m) => m.Header))
const WalletProvider = dynamic(() =>
  import('~context/wallet-context').then((m) => m.WalletProvider),
)
const LoginWidgetProvider = dynamic(() =>
  import('@mochi-ui/core').then((m) => m.LoginWidgetProvider),
)
const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster))

const TopProgressBar = dynamic(() => import('~app/layout/nprogress'), {
  ssr: false,
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export function handleCancelRendering(e: any) {
  if (!e.cancelled) throw e
}

function InnerApp({ Component, pageProps }: AppPropsWithLayout) {
  const { query, asPath, replace, isReady } = useRouter()
  const { isLoggedIn, login, removeToken, hideIsLogging } = useAuthStore(
    useShallow((s) => ({
      isLoggedIn: s.isLoggedIn,
      login: s.login,
      removeToken: s.removeToken,
      hideIsLogging: s.hideIsLogging,
    })),
  )
  const getLayout = Component.getLayout ?? ((page) => page)

  useEffect(() => {
    if (!isReady || isLoggedIn) return
    login({
      token: query.token as string,
      showLoading: true,
    }).then(() => {
      if (!query.token) return
      replace('', undefined, {
        shallow: true,
      }).catch(handleCancelRendering)
    })
  }, [asPath, isLoggedIn, isReady, login, query.token, replace])

  useEffect(() => {
    const parts = asPath.split('#')
    const hash = parts[1]
    const path = parts[0]?.split('?')[0]
    if (hash && hash === 'logout') {
      removeToken()
      replace({ pathname: path }, undefined, {
        shallow: true,
      })
        .catch(handleCancelRendering)
        .finally(hideIsLogging)
    }
  }, [asPath, hideIsLogging, removeToken, replace])

  return (
    <SidebarContextProvider>
      <style jsx global>{`
        html {
          font-family: ${interFont.style.fontFamily};
        }
      `}</style>
      <Header />
      {getLayout(<Component {...pageProps} />)}
    </SidebarContextProvider>
  )
}

export default function App(props: AppPropsWithLayout) {
  return (
    <StrictMode>
      <Toaster
        position="top-right"
        closeButton
        toastOptions={{
          className: 'w-full',
        }}
      />
      <TopProgressBar />
      <Script async src="https://telegram.org/js/telegram-widget.js?22" />
      <WalletProvider>
        <LazyMotion strict features={domAnimation}>
          <LoginWidgetProvider>
            <InnerApp {...props} />
          </LoginWidgetProvider>
        </LazyMotion>
      </WalletProvider>
    </StrictMode>
  )
}
