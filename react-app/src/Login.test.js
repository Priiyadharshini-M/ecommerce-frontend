import { render as rtlRender, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Login } from "./components/Login";
import rootReducer from "./redux/reducer/rootReducer";
import { ToastContainer } from "react-toastify";

const store = createStore(rootReducer, applyMiddleware(thunk))
const render = component => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            {component}
        </BrowserRouter>
    </Provider>
)

describe('Login', () => {
    let btn, emailInput, passwordInput
    beforeEach(() => {
        render(<Login />)
        btn = screen.getByText('Login')
        emailInput = screen.getByPlaceholderText("Enter email")
        passwordInput = screen.getByPlaceholderText("Enter password")
    })

    it("Login handler function allows user to login using credentials - login button", () => {
        expect(btn).toBeInTheDocument()
    })

    it("with invalid credentials error", async () => {
        userEvent.type(emailInput, "priiya303@gmail.com")
        userEvent.type(passwordInput, "priiya12")
        userEvent.click(btn)

        const success = await screen.findByText("Invalid Credentials")
        expect(success).toBeInTheDocument()
    })

    it("with not registered email error", async () => {
        userEvent.type(emailInput, "priiya203@gmail.com")
        userEvent.type(passwordInput, "priiya12")
        userEvent.click(btn)

        const success = await screen.findByText("This email doesn't exist")
        expect(success).toBeInTheDocument()
    })

    it("login success", async () => {
        userEvent.type(emailInput, "ravi@gmail.com")
        userEvent.type(passwordInput, "ravi123")
        userEvent.click(btn)

        const success = await screen.findByText("Successfully logged in")
        expect(success).toBeInTheDocument()
    })

    it("email verification", () => {
        userEvent.type(emailInput, "priiya")
        expect(emailInput.value).not.toMatch("priiya303@gmail.com")
    })

    it("password verification", () => {
        expect(passwordInput).toHaveAttribute("type", "password")
    })
})
