import {RouteComponentProps} from '@reach/router'
import {useService} from '@xstate/react'
import React from 'react'
import {Interpreter} from 'xstate'
import {Button, Container, H1, P, TextContainer} from '../components'

interface WelcomeProps extends RouteComponentProps {
  machine: Interpreter<AppMachineContext, AppMachineSchema, AppMachineEvent>
}
export const Welcome: React.SFC<WelcomeProps> = ({machine}) => {
  const [, send] = useService(machine)
  const startQuiz = () => send('START_QUIZ')

  return (
    <Container>
      <H1>Welcome to the Trivia Challenge</H1>
      <TextContainer>
        <P>You will be presented with 10 true or false questions.</P>
        <P>Can you score 100%?</P>
      </TextContainer>
      <Button onClick={startQuiz}>BEGIN</Button>
    </Container>
  )
}
