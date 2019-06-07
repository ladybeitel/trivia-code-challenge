import {render} from '@testing-library/react'
import * as React from 'react'
import {TextContainer} from '../TextContainer'

describe('<TextContainer/>', () => {
  it('should render without crashing', () => {
    const {container} = render(<TextContainer />)
    expect(container).toMatchSnapshot()
  })
})
