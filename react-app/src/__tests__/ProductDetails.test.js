import rootReducer from "../redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ProductDetails } from "../components/ProductDetails";
import { ToastContainer } from "react-toastify";
import { Login } from "../components/Login";
import React from "react";
import userEvent from "@testing-library/user-event"
import * as actions from "../redux/action/productAction"
import axios from "axios";
import { act } from "react-dom/test-utils"

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
    
    it("login", async() => {
        const { getByText, getByPlaceholderText } = render(<Login />)
        await act(async() => { 
        userEvent.type(getByPlaceholderText("Enter email"),"ravi@gmail.com")
        userEvent.type(getByPlaceholderText("Enter password"),"ravi123")
        userEvent.click(getByText("Login"))
    })
    
        const success = await screen.findByText("Successfully logged in")
        expect(success).toBeInTheDocument()
        axios.interceptors.request.use(
            config => {
              config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
              return config;
            }
          )
    })
    
    it("renders product detail page", async() => {
            render(<ProductDetails productid="63296a718f5fe69c202483a3"/>)
            const view = jest.spyOn(React, "useEffect")
            const spy = jest.spyOn(store,"dispatch")
            const products = jest.spyOn(actions, "viewIndividualProduct")
            const cart = jest.spyOn(actions, "addToCart")
            const result = await waitFor(() => {
            expect(view).toHaveBeenCalled();
            expect(spy).toBeCalled()
            expect(products).toBeCalled()
            const cartButton = screen.getByText("Add to Cart")
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

            userEvent.click(cartButton)
            expect(cart).toBeCalled()
            expect(screen.getAllByText("This product already exists in your cart."))
            })
        })
    
})