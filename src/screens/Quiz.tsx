import {RouteComponentProps} from '@reach/router'
import React from 'react'
import tw from 'tailwind.macro'
// import {State} from 'xstate'
import {Actions, Button, Container, H1, P} from '../components'
// import {AppMachineContext, AppMachineEvent, Question} from '../types'

const QuestionText = tw(P)`w-full md:w-4/5 mb-2 text-center`
const QuestionsCount = tw(P)`text-sm mt-2`
const Content = tw(Container)`w-full md:w-3/4 p-0 md:p-5`

interface QuizProps extends RouteComponentProps {
  // answerFalse: () => State<AppMachineContext, AppMachineEvent>
  answerFalse: () => void
  // answerTrue: () => State<AppMachineContext, AppMachineEvent>
  answerTrue: () => void
  currentQuestionNumber: number
  question: Question
  totalQuestions: number
}
export const Quiz: React.SFC<QuizProps> = ({
  answerFalse,
  answerTrue,
  currentQuestionNumber,
  question,
  totalQuestions,
}) => {
  return (
    <Container>
      <H1>{question.category}</H1>
      <Content>
        <QuestionText>{question.question}</QuestionText>
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
