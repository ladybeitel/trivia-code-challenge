import {useMachine} from '@xstate/react'
import React from 'react'
import Confetti from 'react-confetti'
import tw from 'tailwind.macro'
import {ErrorBoundary, GlobalStyle} from './components'
import {useWindowSize} from './hooks'
import {appMachine} from './machines'
import {
  Failure as FailureScreen,
  Loading as LoadingScreen,
  Quiz as QuizScreen,
  Results as ResultsScreen,
  Welcome as WelcomeScreen,
} from './screens'

const CustomizedConfetti = tw(Confetti)`z-10`
const AppWrapper = tw.div`min-h-screen min-w-screen h-screen w-screen flex justify-center items-center bg-gray-200`
const Main = tw.main`z-20 w-auto h-auto m-4 flex flex-col items-center bg-white rounded shadow md:w-1/2 md:m-0`

function App() {
  const [current, send] = useMachine(appMachine)
  const {width, height} = useWindowSize()
  return (
    <ErrorBoundary>
      <AppWrapper>
        <GlobalStyle />
        <Main>
          {current.matches('welcome') ? (
            <WelcomeScreen startQuiz={() => send('START_QUIZ')} />
          ) : current.matches('loading') ? (
            <LoadingScreen />
          ) : current.matches('failure') ? (
            <FailureScreen
              retry={() => send('RETRY')}
              startOver={() => send('START_OVER')}
            />
          ) : current.matches('quiz') ? (
            <QuizScreen
              answerTrue={() => send({type: 'ANSWER', answer: true})}
              answerFalse={() => send({type: 'ANSWER', answer: false})}
              question={
                current.context.questions[current.context.currentQuestion]
              }
              currentQuestionNumber={current.context.currentQuestionDisplay}
              totalQuestions={current.context.questions.length}
            />
          ) : current.matches('results') ? (
            <ResultsScreen
              questions={current.context.questions}
              playAgain={() => send('PLAY_AGAIN')}
              totalQuestions={current.context.questions.length}
            />
          ) : null}
        </Main>
        {current.context.displayConfetti && (
          <CustomizedConfetti width={width} height={height} />
        )}
      </AppWrapper>
    </ErrorBoundary>
  )
}

export default App
