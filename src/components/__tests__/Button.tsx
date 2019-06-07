import {render} from '@testing-library/react'
import * as React from 'react'
import {Button} from '../Button'

describe('<Button/>', () => {
  it('should render without crashing', () => {
    const {container} = render(<Button />)
    expect(container).toMatchSnapshot()
  })
})
