import {fireEvent, render} from '@testing-library/react'
import {getSimplePaths} from '@xstate/graph'
import {matchesState} from 'xstate'
import App from './App'
import {appMachine} from './machines'

xdescribe('app', () => {
  const simplePaths = getSimplePaths(appMachine)
  Object.keys(simplePaths).forEach(key => {
    const {paths, state: targetState} = simplePaths[key]

    describe(`state: ${key}`, () => {
      paths.forEach(path => {
        const eventString = path.length
          ? 'via ' + path.map(step => step.event.type).join(', ')
          : ''

        it(`reaches ${key} ${eventString}`, async () => {
          // render the app
          const {
            getByText,
            getByTitle,
            getByPlaceholderText,
            baseElement,
            queryByText,
          } = render(<App />)

          // add heuristics for asserting that the state is correct
          function assertState(state: any) {
            const stateValue = state.value

            if (matchesState(stateValue, 'welcome')) {
              expect(getByText('Welcome to the Trivia Challenge'))
            } else if (matchesState(stateValue, 'loading')) {
              expect(getByText('Loading...'))
            } else if (matchesState(stateValue, 'failure')) {
              expect(getByText('Failure!'))
            } else if (matchesState(stateValue, 'quiz')) {
              expect(getByText('True'))
            } else if (matchesState(stateValue, 'results')) {
              expect(getByText('You scored'))
            } else {
              throw new Error(
                'Missing assertion for state' + JSON.stringify(stateValue),
              )
            }
          }

          // add actions that will be executed (and asserted) to produce the events
          async function executeAction(event: any) {
            interface actionInterface {
              START_QUIZ: () => null
              RETRY: () => null
              START_OVER: () => null
              ANSWER: () => null
              PLAY_AGAIN: () => null
            }
            const action: actionInterface = {
              START_QUIZ: () => {
                fireEvent.click(getByText('Begin'))
              },
              RETRY: () => {
                fireEvent.click(getByText('Retry'))
              },
              START_OVER: () => {
                fireEvent.click(getByText('Start Over'))
              },
              ANSWER: () => {
                fireEvent.click(getByText('True'))
              },
              PLAY_AGAIN: () => {
                fireEvent.click(getByText('Play Again'))
              },
            }[event.type]

            if (action) {
              await action(event)
            } else {
              throw new Error(`Action for event '${event.type}' not found`)
            }
          }

          // loop through each of the steps, assert the state, assert/execute the action
          for (let step of path) {
            const {state, event} = step

            await assertState(state)
            await executeAction(event)
          }

          // finally, assert that the target state is reached
          await assertState(targetState)
        })
      })
    })
  })
})
