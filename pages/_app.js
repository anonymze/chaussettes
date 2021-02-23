import '../styles/globals.css'
import { GlobalContextWrapper } from '../context/state';

function MyApp({ Component, pageProps }) {
  return (
    <GlobalContextWrapper>
      <Component {...pageProps} />
    </GlobalContextWrapper>  )
}

export default MyApp
