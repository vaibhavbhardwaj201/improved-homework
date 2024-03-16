import user from '@testing-library/user-event'

import { render, screen } from "../../utils/test-utils"
import HeartIcon from "./HeartIcon"

describe("HeartIcon", () => {
    test("renders HeartIcon and initial state", () => {
        render(<HeartIcon />)
        const heartIcon = screen.getByTestId('heart-icon')
        expect(heartIcon).toBeInTheDocument()
        const heartColor = screen.getByTestId('heart-color')
        expect(heartColor).toHaveAttribute('fill', 'none')
    })

    test("clicking HeartIcon should toggle red and none", async () => {
        user.setup()
        render(<HeartIcon />)
        const heartIcon = screen.getByTestId('heart-icon')
        expect(heartIcon).toBeInTheDocument()
        await user.click(heartIcon)
        const heartColor = screen.getByTestId('heart-color')
        expect(heartColor).toHaveAttribute('fill', 'red')
        await user.click(heartIcon)
        expect(heartColor).toHaveAttribute('fill', 'none')
    })
})
