import { render as rtlRender, screen } from "@testing-library/react" 
import { Provider, useDispatch } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./redux/reducer/rootReducer"
import { Cart } from "./components/Cart"
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute"
import { renderer } from "react-test-renderer"
import userEvent from "@testing-library/user-event"
import React, { useEffect } from 'react';
import { order, removeFromCart, updateCart, updateProduct, viewCart } from "./redux/action/productAction"

const store = createStore(rootReducer, applyMiddleware(thunk))
const render = component => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
        <ToastContainer />
        {component}
        </BrowserRouter>
    </Provider>
)

describe('Cart', () => {
    beforeAll(() => 
    {render(<Login />)
    const btn = screen.getByText('Login')
    const emailInput = screen.getByPlaceholderText("Enter email")
    const passwordInput = screen.getByPlaceholderText("Enter password")
    
    userEvent.type(emailInput, "priiya303@gmail.com")
    userEvent.type(passwordInput, "Priiya123")
    userEvent.click(btn)

    console.log("after login", store.getState())
        jest.spyOn(React, 'useEffect').mockImplementation(React.useEffect)})
    afterAll(() => React.useEffect.mockRestore())
    let btn, emailInput, passwordInput

    //const dispatch = useDispatch()
    console.log("store01",store.getState().user.token)
    // sessionStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJyYXZpQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWQiOiI2MzMzZjAyZWRjZTJjYWJmYjFhMWE5M2EiLCJ1c2VyTmFtZSI6IlJhdmkiLCJpYXQiOjE2NjUxMzM2NDZ9.W3uXsFjdLYkcnSghu82dswKnTmr7MlDnpXQx16fSU1g")
    // beforeEach(() => {
    //     render(<Cart />)
    // })

    it("place order button", () => {
    // store.getState().user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJyYXZpQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWQiOiI2MzMzZjAyZWRjZTJjYWJmYjFhMWE5M2EiLCJ1c2VyTmFtZSI6IlJhdmkiLCJpYXQiOjE2NjUzODAwNzN9.seWJSagErEn1jQdry-x_rghDSW3NsyyP8PtXwyV5NKM.eyJ1c2VyRW1haWwiOiJyYXZpQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWQiOiI2MzMzZjAyZWRjZTJjYWJmYjFhMWE5M2EiLCJ1c2VyTmFtZSI6IlJhdmkiLCJpYXQiOjE2NjUxMzM2NDZ9.W3uXsFjdLYkcnSghu82dswKnTmr7MlDnpXQx16fSU1g"
    // store.getState().user.userId = "6333f02edce2cabfb1a1a93a"
    // store.getState().user.role = "user"
    store.getState().product.cart = [1,2,3,4,5,6]
    console.log("store11",store.getState())
    //dispatch(viewCart(store.getState().user.userId))
    //useEffect = jest.spyOn(React, "useEffect").mockImplementation(f => f());
        render(<Cart />)
        console.log("store2",store.getState())
        const button = screen.getByText('Remove')
        // expect(btn).toBeInTheDocument()
    })

    // it("place", () => {
    //     render(<Login />)
    //     btn = screen.getByText('Login')
    //     emailInput = screen.getByPlaceholderText("Enter email")
    //     passwordInput = screen.getByPlaceholderText("Enter password")

    //     userEvent.type(emailInput, "priiya303@gmail.com")
    //     userEvent.type(passwordInput, "Priiya123")
    //     userEvent.click(btn)

    //     console.log("after login", store.getState())
    // })
})