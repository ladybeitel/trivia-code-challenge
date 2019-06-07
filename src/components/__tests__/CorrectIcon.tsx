import {render} from '@testing-library/react'
import * as React from 'react'
import {CorrectIcon} from '../CorrectIcon'

describe('<CorrectIcon/>', () => {
  it('should render without crashing', () => {
    const {container} = render(<CorrectIcon />)
    expect(container).toMatchSnapshot()
  })
})
