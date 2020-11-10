import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Togglable from './Togglable'


describe('tests for Togglable', () => {
    let component

    beforeEach(() => {
        component = render(
            < Togglable className='togglable' buttonLabel='show...'>
                <div className='testDiv' />
            </Togglable>
        )
    })

    test('successfully renders it\'s children', () => {
        expect(
            component.container.querySelector('.testDiv')
        ).toBeDefined()
    })

    test('children hidden at start', () => {
        const child = component.container.querySelector('.togglableContent')

        expect(child).toHaveStyle('display: none')
    })

    test('clicking the button shows the children', () => {
        const child = component.container.querySelector('.togglableContent')

        const button = component.getByText('show...')

        fireEvent.click(button)

        expect(child).not.toHaveStyle('display: none')
    })

    test('clicking the second button hides the children again', () => {
        const openButton = component.getByText('show...')
        fireEvent.click(openButton)

        const closeButton = component.getByText('cancel')
        fireEvent.click(closeButton)

        const togglableContent = component.container.querySelector('.togglableContent')

        expect(togglableContent).toHaveStyle('display: none')
    })
})