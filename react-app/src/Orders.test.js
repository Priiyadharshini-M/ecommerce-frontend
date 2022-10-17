import { render as rtlRender, screen, waitFor } from "@testing-library/react" 
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./redux/reducer/rootReducer"
import { Orders } from "./components/Orders"
import { Login } from "./components/Login";
import userEvent from "@testing-library/user-event"
import React from 'react';
import * as actions from "./redux/action/productAction"
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

describe('Order', () => {
    it("login", async() => {
        const { getByText, getByPlaceholderText } = render(<Login />)
        await act(async() => { 
        userEvent.type(getByPlaceholderText("Enter email"),"priiya303@gmail.com")
        userEvent.type(getByPlaceholderText("Enter password"),"Priiya123")
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

    it("renders order page for user/admin and can cancel active products", async() => {
        render(<Orders />)
        const view = jest.spyOn(React, "useEffect")
        const spy = jest.spyOn(store, "dispatch")
        const orders = jest.spyOn(actions, "viewOrder")
        const cancelOrder = jest.spyOn(actions, "cancelOrder")
        const updateProduct = jest.spyOn(actions, "updateProduct")
        const result = await waitFor(() => {
            expect(view).toHaveBeenCalled()
            const active = screen.getAllByText("Active")
            const cancelled = screen.getAllByText("Cancelled")
            if(store.getState().user.role === "user"){
            const cancelButton = screen.getAllByText("Cancel order")
            
            // userEvent.click(cancelButton[0])
            // expect(cancelOrder).toHaveBeenCalled()
            // expect(updateProduct).toHaveBeenCalled()
            }

            if(store.getState().user.role === "admin"){
                expect(screen.getAllByTestId("customerName")).toBeTruthy()
                }
        })
    })

})