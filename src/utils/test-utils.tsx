import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { AppProvider } from '../contexts/AppContext'

afterEach(() => {
    cleanup()
})

function customRender(ui: React.ReactElement, options = {}) {
    return render(ui, {
        // wrap provider(s) here if needed
        wrapper: AppProvider,
        ...options,
    })
}

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }