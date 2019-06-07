import {render} from '@testing-library/react'
import * as React from 'react'
import {Actions} from '../Actions'

describe('<Actions/>', () => {
  it('should render without crashing', () => {
    const {container} = render(<Actions />)
    expect(container).toMatchSnapshot()
  })
})
