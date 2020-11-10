import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Note from './Note'


test('successfully renders note component', () => {
    const note = {
        content: 'render note in test environment with @testing-library/react',
        important: true
    }

    const component = render(
        <Note className='note' note={note}/>
    )

    const button = component.container.querySelector('button')

    console.log(prettyDOM(button))

    expect(component.container).toHaveTextContent(
        'render note in test environment with @testing-library/react'
    )

    const element = component.getByText(
        'render note in test environment with @testing-library/react'
    )
    expect(element).toBeDefined()

    const div = component.container.querySelector('.note')
    expect(div).toHaveTextContent(
        'render note in test environment with @testing-library/react'
    )
})

test('clicking the toggle importance button fires handler once', () => {
    const note = {
        content: 'render note in test environment with @testing-library/react',
        important: true
    }

    const mockHandler = jest.fn()

    const component = render(
        <Note className='note' note={note} toggleImportance={mockHandler}/>
    )

    const button = component.getByText('Make not important')

    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(1)
})