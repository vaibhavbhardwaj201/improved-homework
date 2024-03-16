import user from '@testing-library/user-event'

import { render, screen } from "../../utils/test-utils"
import Image from "./Image"

import { data } from '../../hooks/use-fetch-images/data'


describe("Image", () => {
    test("renders correctly", () => {
        render(
            <Image
                title="test"
                author="test"
                url={data.photos[0]}
            />
        )
        const img = screen.getByRole('img')
        expect(img).toBeInTheDocument()
    })

    test("hover state", async () => {
        user.setup()
        render(
            <Image
                title="title"
                author="author"
                url={data.photos[0]}
            />
        )
        const img = screen.getByRole('img')
        await user.hover(img)
        expect(screen.getByText('title')).toBeInTheDocument()
        expect(screen.getByText('author')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    test("clicking on button", async () => {
        user.setup()
        render(
            <Image
                title="title"
                author="author"
                url={data.photos[0]}
            />
        )
        const img = screen.getByRole('img')

        user.hover(img)
        expect(screen.getByText('Favourite')).toBeInTheDocument()

        await user.click(screen.getByRole('button'))
        expect(screen.getByText('Remove')).toBeInTheDocument()

        await user.click(screen.getByRole('button'))
        expect(screen.getByText('Favourite')).toBeInTheDocument()
    })

})
