import React from 'react'
import {State} from 'xstate'
import {Button, Container, H1, P, TextContainer} from '../components'

interface WelcomeProps {
  startQuiz: () => State<AppMachineContext, AppMachineEvent>
}
export const Welcome: React.SFC<WelcomeProps> = ({startQuiz}) => (
  <Container>
    <H1>Welcome to the Trivia Challenge</H1>
    <TextContainer>
      <P>You will be presented with 10 true or false questions.</P>
      <P>Can you score 100%?</P>
    </TextContainer>
    <Button onClick={startQuiz}>BEGIN</Button>
  </Container>
)
