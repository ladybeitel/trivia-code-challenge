import {render} from '@testing-library/react'
import * as React from 'react'
import {GlobalStyle} from '../GlobalStyle'

describe('<GlobalStyle/>', () => {
  it('should render without crashing', () => {
    const {container} = render(<GlobalStyle />)
    expect(container).toMatchSnapshot()
  })
})
