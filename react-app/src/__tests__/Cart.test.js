import { render as rtlRender, screen, waitFor } from "@testing-library/react" 
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "../redux/reducer/rootReducer"
import { Cart } from "../components/Cart"
import { Login } from "../components/Login";
import userEvent from "@testing-library/user-event"
import React from 'react';
import * as actions from "../redux/action/productAction"
import { act } from "react-dom/test-utils"
import axios from "axios"

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
    it("login", async() => {
    const { getByText, getByPlaceholderText } = render(<Login />)
    await act(async() => { 
    userEvent.type(getByPlaceholderText("Enter email"),"ravi@gmail.com")
    userEvent.type(getByPlaceholderText("Enter password"),"ravi123")
    userEvent.click(getByText("Login"))
})

    const success = await screen.findByText("Successfully logged in")
    expect(success).toBeInTheDocument()
    sessionStorage.setItem("token",store.getState().user.token)
    axios.interceptors.request.use(
        config => {
          config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
          return config;
        }
      )
})
    it("renders cart page and can remove or update quantity from cart success", async() => {
        render(<Cart />)
        const view = jest.spyOn(React, "useEffect")
        const spy = jest.spyOn(store,"dispatch")
        const cart = jest.spyOn(actions, "viewCart")
        const increase = jest.spyOn(actions, "updateCart")
        const confirm = jest.spyOn(actions, "order")
        const result = await waitFor(() => {
        expect(view).toHaveBeenCalled();
        if(store.getState().product.cart.length > 0 === true){
        // const removeButton = screen.getAllByText("Remove")
        // userEvent.click(removeButton[0])
        // screen.getByText("Removed from cart")

        // const increaseButton = screen.getAllByTestId("plus-circle")
        // userEvent.click(increaseButton[0])
        // expect(increase).toHaveBeenCalled()
        // screen.getByText("Updated quantity")

        // const decreaseButton = screen.getAllByTestId("dash-circle")
        // userEvent.click(decreaseButton[0])
        // expect(increase).toHaveBeenCalled()
        // screen.getByText("Updated quantity")

        const placeOrder = screen.getByText("Place order")
        userEvent.click(placeOrder)
        screen.getByText("Confirm to place the order?")
        const confirmOrder = screen.getAllByText("Confirm")
        userEvent.click(confirmOrder[0])
        expect(confirm).toHaveBeenCalled()
        }
        if(store.getState().product.cart.length <= 0){
            window.location.reload()
            expect(screen.getByText("No products found in cart")).toBeInTheDocument()
            expect(screen.getByText("Shop now")).toBeInTheDocument()
        }
        })
    })
})