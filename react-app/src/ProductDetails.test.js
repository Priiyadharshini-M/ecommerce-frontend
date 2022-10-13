import rootReducer from "./redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { fireEvent, render as rtlRender, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ProductDetails } from "./components/ProductDetails";
import { ToastContainer } from "react-toastify";
import { Login } from "./components/Login";
import React from "react";
import userEvent from "@testing-library/user-event"
import * as actions from "./redux/action/productAction"

const store = createStore(rootReducer, applyMiddleware(thunk))
const render = component => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            {component}
        </BrowserRouter>
    </Provider>
)

describe("Product details page", () => {
    let view, spy, products
    beforeEach(() => {
        render(<ProductDetails productid="63296a718f5fe69c202483a3"/>)
        view = jest.spyOn(React, "useEffect")
        spy = jest.spyOn(store,"dispatch")
        products = jest.spyOn(actions, "viewIndividualProduct")
    })
    it("renders product detail page", async() => {
        const result = await waitFor(() => {
        expect(view).toHaveBeenCalled();
        expect(spy).toBeCalled()
        expect(products).toBeCalled()
        expect(screen.getByText("Add to Cart")).toBeInTheDocument()
        expect(screen.getAllByTestId("productName")).toBeTruthy()
        expect(screen.getAllByTestId("previewImage")).toBeTruthy()
        expect(screen.getAllByText("Product Details")).toBeTruthy()
        if(store.getState().product.productDetail[0].stock<=0)
        {
            expect(screen.getAllByText("Out of Stock")).toBeTruthy()
            expect(screen.queryByTestId("stockquantity").textContent).toBe("0")
        }
        expect(screen.getAllByTestId("price")).toBeTruthy()
        expect(screen.queryByTestId("stockquantity").textContent).not.toBe("0")
        })
    })

    it("add to cart success", async() => {
        const {getByText, getByPlaceholderText, findByText} = render(<Login />)
        const loginbtn = getByText('Login')
        const emailInput = getByPlaceholderText("Enter email")
        const passwordInput = getByPlaceholderText("Enter password")

        userEvent.type(emailInput, "ravi@gmail.com")
        userEvent.type(passwordInput, "ravi123")
        userEvent.click(loginbtn)

        const loginsuccess = getByText("Successfully logged in")
        expect(loginsuccess).toBeInTheDocument()
        const result = await waitFor(() => {
           const btn = screen.getByText("Add to Cart")
           fireEvent.click(btn)

           const success = screen.getByText("Added to cart successfully")
        })
    })
})