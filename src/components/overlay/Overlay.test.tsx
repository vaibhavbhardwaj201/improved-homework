import { render, screen } from "../../utils/test-utils"
import Overlay from "./Overlay"

const mockContextValue = {
    classActive: true,
    favourite: [
        { id: 1, alt: 'Image Alt 1', photographer: 'Photographer 1', img: 'image1.jpg' },
        { id: 2, alt: 'Image Alt 2', photographer: 'Photographer 2', img: 'image2.jpg' },
    ]
}

describe("Overlay", () => {
    test("renders correctly", () => {
        const overlay = render(<Overlay />)
        expect(overlay).toBeTruthy()
    })

    test("renders title when empty", () => {
        render(<Overlay />)
        const title = screen.getByText(/Nothing to show!/i)
        expect(title).toBeInTheDocument()
    })

    test("don't renders title", () => {
        render(<Overlay />)
        const title = screen.queryByText(/Favourite images/i)
        expect(title).not.toBeInTheDocument()
    })

    test("should return the context value", async () => {
        render(<Overlay />, { contextValue: mockContextValue })

        const len = mockContextValue.favourite
        expect(len).toHaveLength(2)

        expect(mockContextValue.classActive).toBe(true)
    })
})
