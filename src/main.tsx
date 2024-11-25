import React, { MutableRefObject, RefObject, useRef, useState } from 'react'
import ReactDOM from 'react-dom/client'
import { Main } from './components/Main/Main'
import './index.css'
import { UserProvider } from './UserContext'
import { Boost } from './components/Boost/Boost'
import { Earn } from './components/Earn/Earn'

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element')

export function App() {

  const [width, setWidth] = useState(0);

  const boostRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const earnRef = useRef<HTMLDivElement>(null);

  return (
    <React.StrictMode>
      <UserProvider>
        <Main width={width} setWidth={setWidth} earnRef={earnRef} boostRef={boostRef} mainRef={mainRef} />
        <Boost setWidth={setWidth} boostRef={boostRef} mainRef={mainRef} earnRef={earnRef} />
        <Earn earnRef={earnRef} boostRef={boostRef} mainRef={mainRef} />
      </UserProvider>
    </React.StrictMode>
  )
}

ReactDOM.createRoot(rootElement).render(
  <App />
)
