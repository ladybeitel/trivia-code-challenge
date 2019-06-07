import {render} from '@testing-library/react'
import * as React from 'react'
import {WrongIcon} from '../WrongIcon'

describe('<WrongIcon/>', () => {
  it('should render without crashing', () => {
    const {container} = render(<WrongIcon />)
    expect(container).toMatchSnapshot()
  })
})
