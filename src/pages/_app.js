import '@/styles/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { useEffect } from 'react'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function App({ Component, pageProps }) {
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
  }, [])

  return <Component {...pageProps} />
}
