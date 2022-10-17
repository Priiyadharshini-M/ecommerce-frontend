import { render as rtlRender, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducer/rootReducer";
import { ToastContainer } from "react-toastify";
import { Product } from "../components/Product";
import { fireEvent } from "@testing-library/react";
import { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { Login } from "../components/Login";
import axios from "axios";

const store = createStore(rootReducer, applyMiddleware(thunk))
const render = component => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
            <ToastContainer />
            {component}
        </BrowserRouter>
    </Provider>
)

describe('Add Product', () => {
    it('product name verification', async () => {
        const { getByTestId } = render(<Product />)
        await act(async () => {
            fireEvent.change(getByTestId("productName"), { target: { value: "Shirt$" } })
            fireEvent.blur(getByTestId("productName"))
        })
        const spanElement = getByTestId('productName_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('image verification', async () => {
        const { getByTestId } = render(<Product />)
        await act(async () => {
            fireEvent.change(getByTestId("image"), { target: { value: "" } })
            fireEvent.blur(getByTestId("image"))
        })
        const spanElement = getByTestId('image_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it('description verification', async () => {
        const { getByTestId } = render(<Product />)
        await act(async () => {
            fireEvent.change(getByTestId("description"), { target: { value: "Nice one!" } })
            fireEvent.blur(getByTestId("description"))
        })
        const spanElement = getByTestId('description_Error')
        expect(spanElement).toBeInTheDocument()
    })

    it("price verification", async () => {
        const { getByTestId } = render(<Product />)
        await act(async () => {
            fireEvent.change(getByTestId("price"), { target: { value: "-1" } })
            fireEvent.blur(getByTestId("price"))
        })
        const spanElement = getByTestId('price_Error')
        expect(spanElement).toBeInTheDocument()
        expect(getByTestId("price")).toHaveAttribute("type", "number")
    })

    it("product category and type verification", async () => {
        const { getByTestId } = render(<Product />)
        await act(async () => {
            fireEvent.change(getByTestId("productCategory"), { target: { value: "D#%8" } })
            fireEvent.change(getByTestId("productType"), { target: { value: "h" } })
            fireEvent.blur(getByTestId("productCategory"))
            fireEvent.blur(getByTestId("productType"))
        })
        let spanElement = getByTestId('productType_Error')
        expect(spanElement).toBeInTheDocument()
         spanElement = getByTestId('productCategory_Error')
         expect(spanElement).toBeInTheDocument()
    })

    it("stock verification", async () => {
        const { getByTestId } = render(<Product />)
        await act(async () => {
            fireEvent.change(getByTestId("quantity"), { target: { value: "0" } })
            fireEvent.blur(getByTestId("quantity"))
        })
        const spanElement = getByTestId('quantity_Error')
        expect(spanElement).toBeInTheDocument()
        expect(getByTestId("quantity")).toHaveAttribute("type", "number")
    })

    it("already existing product", async () => {
        render(<Login />)
        const loginbtn = screen.getByText('Login')
        const emailInput = screen.getByPlaceholderText("Enter email")
        const passwordInput = screen.getByPlaceholderText("Enter password")

        userEvent.type(emailInput, "priiya303@gmail.com")
        userEvent.type(passwordInput, "Priiya123")
        userEvent.click(loginbtn)

        const loginsuccess = await screen.findByText("Successfully logged in")
        expect(loginsuccess).toBeInTheDocument()

        sessionStorage.setItem("token",store.getState().user.token)
        axios.interceptors.request.use(
            config => {
              config.headers['Authorization'] = `Bearer ${sessionStorage.getItem('token')}`;
              return config;
            }
          )

        render(<Product />)
        const btn = await screen.findByText('Submit')
        userEvent.type(screen.getByPlaceholderText("Enter product name"), "Zero shirt")
        userEvent.type(screen.getByPlaceholderText("Attach image"), "https://images-eu.ssl-images-amazon.com/images/I/618Wek95laS._AC._SR360,460.jpg")
        userEvent.type(screen.getByPlaceholderText("Enter description"), "Mens Casual Trendy Slim45")
        userEvent.type(screen.getByPlaceholderText("Enter price"), "1200")
        userEvent.type(screen.getByPlaceholderText("Enter category ex: full sleve shirt"), "Full sleve shirt")
        userEvent.type(screen.getByPlaceholderText("Enter type ex: shirt"), "Shirt")
        userEvent.type(screen.getByPlaceholderText("Enter stock quantity"), "12")

        expect(btn).toBeInTheDocument()
        userEvent.click(btn)

        const success = await screen.findAllByText("This product already exists in this category.")
        expect(success).toBeTruthy()
    })
})