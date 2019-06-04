import React from 'react'
import tw from 'tailwind.macro'
import {GlobalStyle} from './components'
// import {AppMachine} from './machines'

const AppWrapper = tw.div`min-h-screen min-w-screen h-screen w-screen flex bg-gray-100`
const Main = tw.main`flex flex-1 flex-grow w-full flex-col overflow-x-scroll`

function App() {
  // const [current, send] = useMachine(AppMachine)
  return (
    <AppWrapper>
      <GlobalStyle />
      <Main>
        <p>Testing</p>
      </Main>
    </AppWrapper>
  )
}

export default App
