import {RouteComponentProps} from '@reach/router'
import {useService} from '@xstate/react'
import React from 'react'
import tw from 'tailwind.macro'
import {Interpreter} from 'xstate'
import {Actions, Button, Container, H1, P} from '../components'
import {Failure, Loading} from './'

const Question = tw(P)`w-4/5 mb-2 text-center`
const QuestionsCount = tw(P)`text-sm mt-2`
const Content = tw(Container)``

interface QuizProps extends RouteComponentProps {
  //   answerFalse: () => State<AppMachineContext, AppMachineEvent>
  //   answerTrue: () => State<AppMachineContext, AppMachineEvent>
  //   currentQuestionNumber: number
  //   question: Question
  //   totalQuestions: number
  machine: Interpreter<AppMachineContext, AppMachineSchema, AppMachineEvent>
}
export const Quiz: React.SFC<QuizProps> = ({machine}) => {
  const [current, send] = useService(machine)
  const answerTrue = () => send({type: 'ANSWER', answer: true})
  const answerFalse = () => send({type: 'ANSWER', answer: false})
  const question = current.context.questions[current.context.currentQuestion]
  const currentQuestionNumber = current.context.currentQuestionDisplay
  const totalQuestions = current.context.questions.length

  if (current.matches('loading')) {
    return <Loading />
  } else if (current.matches('failure')) {
    return (
      <Failure
        retry={() => send('RETRY')}
        startOver={() => send('START_OVER')}
      />
    )
  }
  return (
    <Container>
      <H1>{question.category}</H1>
      <Content>
        <Question>{question.question}</Question>
        <Actions>
          <Button onClick={answerTrue}>True</Button>
          <Button onClick={answerFalse}>False</Button>
        </Actions>
      </Content>
      <QuestionsCount>
        {currentQuestionNumber} of {totalQuestions}
      </QuestionsCount>
    </Container>
  )
}
