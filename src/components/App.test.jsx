import '@testing-library/jest-dom'
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import { render, screen } from "@testing-library/react"
import { expect, it, describe } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('App Component', () => {
  let container
  beforeEach(() => {
    container = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ).container
  })

  it('renders the Home Component', () => {
    expect(container.querySelector('h2')).not.toBeNull()
    expect(container.querySelector('h2')).toHaveTextContent('Journal Entries')
  })
  
  it('renders CategorySelection Component when new entry is clicked', async () => {
    await userEvent.click(screen.getByText('Select Category'))

    expect(container.querySelector('h3')).not.toBeNull()
    expect(container.querySelector('h3')).toHaveTextContent('Please select a category')
  })
})