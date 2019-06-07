import {RouteComponentProps} from '@reach/router'
import {useService} from '@xstate/react'
import React from 'react'
import tw from 'tailwind.macro'
import {Interpreter} from 'xstate'
import {Button, Container, CorrectIcon, H1, WrongIcon} from '../components'
import {getTotalCorrectAnswers} from '../utils'

const QuestionResults = tw.ul`w-3/4 my-4`
const Icon = tw.span`mr-4`
const Result = tw.li`flex mb-4 items-center`

interface ResultsProps extends RouteComponentProps {
  machine: Interpreter<AppMachineContext, AppMachineSchema, AppMachineEvent>
}

export const Results: React.SFC<ResultsProps> = ({machine}) => {
  const [current, send] = useService(machine)
  const questions = current.context.questions
  const totalCorrectAnswers = getTotalCorrectAnswers(questions)
  const playAgain = () => send('PLAY_AGAIN')
  const totalQuestions = current.context.questions.length

  return (
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
}
