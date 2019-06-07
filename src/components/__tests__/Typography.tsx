import {render} from '@testing-library/react'
import * as React from 'react'
import {H1, P} from '../Typography'

describe('<H1/>', () => {
  it('should render without crashing', () => {
    const {container} = render(<H1 />)
    expect(container).toMatchSnapshot()
  })
})

describe('<P/>', () => {
  it('should render without crashing', () => {
    const {container} = render(<P />)
    expect(container).toMatchSnapshot()
  })
})
