import '../styles/globals.scss'
import { Store as ContextProvider } from '../context';

function App({ Component, pageProps }) {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  )
}

export default App;