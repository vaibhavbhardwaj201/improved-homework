import user from '@testing-library/user-event'

import { render, screen } from "../../utils/test-utils"
import Searchbar from "./SearchBar"

describe("Searchbar", () => {
    test("renders correctly", () => {
        render(<Searchbar />)
        const input = screen.getByPlaceholderText('Search for items')
        expect(input).toBeInTheDocument()
        expect(input).toHaveValue('')
    })

    test("search input works", async () => {
        user.setup()
        render(<Searchbar />)
        const input = screen.getByPlaceholderText('Search for items')
        await user.type(input, 'test')
        expect(input).toHaveValue('test')
    })
})