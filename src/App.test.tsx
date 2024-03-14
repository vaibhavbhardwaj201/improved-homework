import App from "./App"
import { AppProvider } from "./contexts/AppContext"
import { render, screen } from "./utils/test-utils"


test("renders search", () => {
    render(<App />, { wrapper: AppProvider })
    expect(screen.getByRole('textbox')).toBeInTheDocument()
})