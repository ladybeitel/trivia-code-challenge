import {RouteComponentProps} from '@reach/router'
import React from 'react'
import tw from 'tailwind.macro'
// import {State} from 'xstate'
import {Button, Container, CorrectIcon, H1, WrongIcon} from '../components'
import {Question} from '../types'
// import {AppMachineContext, AppMachineEvent, Question} from '../types'

const QuestionResults = tw.ul`w-3/4 my-4`
const Icon = tw.span`mr-4`
const Result = tw.li`flex mb-4 items-center`

interface ResultsProps extends RouteComponentProps {
  questions: Question[]
  // playAgain: () => State<AppMachineContext, AppMachineEvent>
  playAgain: () => void
  totalCorrectAnswers: number
  totalQuestions: number
}

export const Results: React.SFC<ResultsProps> = ({
  playAgain,
  questions,
  totalCorrectAnswers,
  totalQuestions,
}) => (
  <Container>
    <H1>
      You scored
      <br />
      {totalCorrectAnswers} / {totalQuestions}
    </H1>
    <QuestionResults>
      {questions.map(question => (
        <Result key={question.question}>
          <Icon>
            {question.correct === true ? <CorrectIcon /> : <WrongIcon />}
          </Icon>{' '}
          {question.question}
        </Result>
      ))}
    </QuestionResults>
    <Button onClick={playAgain}>Play Again</Button>
  </Container>
)
