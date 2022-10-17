import { Login } from "../components/Login";
import { Header } from "../components/Header"
import rootReducer from "../redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { render as rtlRender, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event"
import { cleanup } from "@testing-library/react";
import "jest-location-mock";

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
    it("before login header content", async() => {
        render(<Header />)
        expect(screen.getByText('Login')).toBeInTheDocument()
        expect(screen.queryByText('Logout')).not.toBeInTheDocument()
        expect(screen.getByText('Guest')).toBeInTheDocument()
        expect(screen.queryByText('My orders')).not.toBeInTheDocument()
        expect(screen.queryByText('Add Product')).not.toBeInTheDocument()
        expect(screen.queryByTestId('cartIcon')).not.toBeInTheDocument()
    })

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
        expect(screen.queryByText('Add Product')).not.toBeInTheDocument()
        expect(screen.queryByText('All orders')).not.toBeInTheDocument()

        const logOut = screen.getByText('Logout')
        expect(logOut).toBeInTheDocument()
        expect(screen.getByText('Ravi')).toBeInTheDocument()
        expect(screen.getByTestId('cartIcon')).toBeInTheDocument()

        userEvent.click(logOut)
        expect(screen.getByText('Guest')).toBeInTheDocument()
        expect(window.location).toBeAt("/")
    })

    it("logined admin header content", async() => {
        cleanup()
        render(<Login />)
        const btn = screen.getByText('Login')
        const emailInput = screen.getByPlaceholderText("Enter email")
        const passwordInput = screen.getByPlaceholderText("Enter password")

        userEvent.type(emailInput, "priiya303@gmail.com")
        userEvent.type(passwordInput, "Priiya123")
        userEvent.click(btn)

        const success = await screen.findByText("Successfully logged in")
        expect(success).toBeInTheDocument()

        render(<Header />)
        expect(screen.getByText('All orders')).toBeInTheDocument()
        expect(screen.getByText('Logout')).toBeInTheDocument()
        expect(screen.getByText('Priiya')).toBeInTheDocument()
        expect(screen.getByText('Add Product')).toBeInTheDocument()
        expect(screen.queryByText('My orders')).not.toBeInTheDocument()

    })
})