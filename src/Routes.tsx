import {Router} from '@reach/router'
import {useMachine} from '@xstate/react'
import React from 'react'
import Confetti from 'react-confetti'
import tw from 'tailwind.macro'
import {useWindowSize} from './hooks'
import {appMachine} from './machines'
import {Quiz, Results, Welcome} from './screens'

const CustomizedConfetti = tw(Confetti)`z-10`
const Main = tw.main`z-20 w-auto h-auto m-4 flex flex-col items-center bg-white rounded shadow md:w-1/2 md:m-0`

const Routes: React.SFC = () => {
  const [current, , service] = useMachine(appMachine)
  const {width, height} = useWindowSize()
  console.log(current)
  return (
    <>
      <Main>
        <Router>
          <Welcome path='/' machine={service} />
          <Quiz path='/quiz' machine={service} />
          <Results path='/results' machine={service} />
        </Router>
      </Main>
      {current.context.displayConfetti && (
        <CustomizedConfetti width={width} height={height} />
      )}
    </>
  )
}
//   <LoadingScreen />
//
//   <FailureScreen
//     retry={() => send('RETRY')}
//     startOver={() => send('START_OVER')}
//   />

export default Routes
