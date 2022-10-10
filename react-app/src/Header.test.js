import { Login } from "./components/Login";
import { Header } from "./components/Header"
import rootReducer from "./redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { render as rtlRender, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event"

const store = createStore(rootReducer, applyMiddleware(thunk))
const render = component => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            {component}
        </BrowserRouter>
    </Provider>
)

describe('Header', () => {
    it("logined user header content", async () => {
        render(<Login />)
        const btn = screen.getByText('Login')
        const emailInput = screen.getByPlaceholderText("Enter email")
        const passwordInput = screen.getByPlaceholderText("Enter password")

        userEvent.type(emailInput, "ravi@gmail.com")
        userEvent.type(passwordInput, "ravi123")
        userEvent.click(btn)

        const success = await screen.findByText("Successfully logged in")
        expect(success).toBeInTheDocument()
        

        render(<Header />)
        expect(screen.getByText('My orders')).toBeInTheDocument()
        expect(screen.getByText('Logout')).toBeInTheDocument()
        expect(screen.getByText('Ravi')).toBeInTheDocument()
        expect(screen.getByTestId('cartIcon')).toBeInTheDocument()

    })
})