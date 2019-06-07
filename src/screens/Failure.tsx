import React from 'react'
import {State} from 'xstate'
import {Actions, Button, Container, H1, P, TextContainer} from '../components'

interface FailureProps {
  retry: () => State<AppMachineContext, AppMachineEvent>
  startOver: () => State<AppMachineContext, AppMachineEvent>
}

export const Failure: React.SFC<FailureProps> = ({retry, startOver}) => (
  <Container>
    <H1>Failure!</H1>
    <TextContainer>
      <P>Looks like there where a problem.</P>
      <P>You can retry loading the game or start over.</P>
    </TextContainer>
    <Actions>
      <Button onClick={retry}>Retry</Button>
      <Button onClick={startOver}>Start Over</Button>
    </Actions>
  </Container>
)
