import { render, screen } from '@testing-library/react'
import Todo from './Todo'

describe('Todo', () => {
  it('renders the Todo component', () => {
    render(<Todo />)
    
    screen.debug(); // prints out the jsx in the App component unto the command line
  })
})
