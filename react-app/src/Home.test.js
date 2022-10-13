import rootReducer from "./redux/reducer/rootReducer";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { render as rtlRender, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Home } from "./components/Home";
import { ToastContainer } from "react-toastify";
import React from "react";
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

describe("Home page", () => {
    it("renders home page", async() => {
        render(<Home />)
        const view = jest.spyOn(React, "useEffect")
        const spy = jest.spyOn(store,"dispatch")
        const products = jest.spyOn(actions, "viewProducts")
        const productTypes = jest.spyOn(actions, "viewProductTypes")
        const result = await waitFor(() => {
        expect(view).toHaveBeenCalled();
        expect(spy).toBeCalled()
        expect(products).toBeCalled()
        expect(productTypes).toBeCalled()
        expect(screen.getByText("Filter")).toBeInTheDocument()
        expect(screen.getAllByTestId("productName")).toBeTruthy()
        expect(screen.getAllByTestId("productImage")).toBeTruthy()
        expect(screen.getAllByTestId("stock")).toBeTruthy()
        expect(screen.getAllByTestId("price")).toBeTruthy()
        expect(screen.getAllByTestId("category")).toBeTruthy()
        expect(screen.getAllByTestId("description")).toBeTruthy()
        })
    })
})