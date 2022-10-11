import { render as rtlRender, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducer/rootReducer";
import { ToastContainer } from "react-toastify";
import { Register } from "./components/Register";
import { fireEvent } from "@testing-library/react";
import { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";

const store = createStore(rootReducer, applyMiddleware(thunk))
const render = component => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            {component}
        </BrowserRouter>
    </Provider>
)

describe('Register', () => {
    it('name verification', async () => {
        const { getByTestId } = render(<Register />)
        await act(async () => {
            fireEvent.change(getByTestId("name"), { target: { value: "E#@$G" } })
            fireEvent.blur(getByTestId("name"))
        })
        const spanElement = getByTestId('name_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('email verification', async () => {
        const { getByTestId } = render(<Register />)
        await act(async () => {
            fireEvent.change(getByTestId("email"), { target: { value: "^%ghijkyh@gmail.com" } })
            fireEvent.blur(getByTestId("email"))
        })
        const spanElement = getByTestId('email_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('phone number verification', async () => {
        const { getByTestId } = render(<Register />)
        await act(async () => {
            fireEvent.change(getByTestId("phone"), { target: { value: "2845765673" } })
            fireEvent.blur(getByTestId("phone"))
        })
        const spanElement = getByTestId('phone_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it("password verification", async () => {
        const { getByTestId } = render(<Register />)
        await act(async () => {
            fireEvent.change(getByTestId("password"), { target: { value: "284" } })
            fireEvent.blur(getByTestId("password"))
        })
        const spanElement = getByTestId('password_Error')
        expect(spanElement).toBeInTheDocument()
        expect(getByTestId("password")).toHaveAttribute("type", "password")
    })

    it("confirm password verification", async () => {
        const { getByTestId } = render(<Register />)
        await act(async () => {
            fireEvent.change(getByTestId("password"), { target: { value: "284" } })
            fireEvent.change(getByTestId("cnfmPass"), { target: { value: "2845" } })
            fireEvent.blur(getByTestId("cnfmPass"))
        })
        const spanElement = getByTestId('cnfmPass_Error')
        expect(spanElement).toBeInTheDocument()
    })

    // it("register success with correct inputs", async() => {
    //     render(<Register />)
    //     const btn = screen.getByText('Register')
    //         userEvent.type(screen.getByPlaceholderText("Enter name"), "Ravirahul")
    //         userEvent.type(screen.getByPlaceholderText("Enter email"), "ravirahull@gmail.com")
    //         userEvent.type(screen.getByPlaceholderText("Enter phone number"), "9845765670")
    //         userEvent.type(screen.getByPlaceholderText("Enter password"), "ravirahul12")
    //         userEvent.type(screen.getByPlaceholderText("Retype password"), "ravirahul12")
    //         expect(btn).toBeInTheDocument()
    //         userEvent.click(btn)

    //         const success = await screen.findByText("Registered successfully")
    //         expect(success).toBeInTheDocument()
    // })

    it("already existing email", async () => {
        render(<Register />)
        const btn = screen.getByText('Register')
        userEvent.type(screen.getByPlaceholderText("Enter name"), "Ravirahul")
        userEvent.type(screen.getByPlaceholderText("Enter email"), "priiya303@gmail.com")
        userEvent.type(screen.getByPlaceholderText("Enter phone number"), "9845765670")
        userEvent.type(screen.getByPlaceholderText("Enter password"), "ravirahul12")
        userEvent.type(screen.getByPlaceholderText("Retype password"), "ravirahul12")
        expect(btn).toBeInTheDocument()
        userEvent.click(btn)

        const success = await screen.findByText("User Email already exists")
        expect(success).toBeInTheDocument()
    })
})