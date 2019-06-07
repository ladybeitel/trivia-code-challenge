import React from 'react'
import tw from 'tailwind.macro'
import {ErrorBoundary, GlobalStyle} from './components'
import Routes from './Routes'

const AppWrapper = tw.div`min-h-screen min-w-screen h-screen w-screen flex justify-center items-center bg-gray-200`

function App() {
  return (
    <ErrorBoundary>
      <AppWrapper>
        <GlobalStyle />
        <Routes />
      </AppWrapper>
    </ErrorBoundary>
  )
}

export default App
