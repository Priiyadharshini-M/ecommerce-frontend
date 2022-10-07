import { render as rtlRender, screen } from "@testing-library/react" 
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./redux/reducer/rootReducer"
import { Cart } from "./components/Cart"
import { ProtectedRoute } from "./components/ProtectedRoute"
import { renderer } from "react-test-renderer"

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
    console.log("store",store.getState().user.token)
    // sessionStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJyYXZpQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWQiOiI2MzMzZjAyZWRjZTJjYWJmYjFhMWE5M2EiLCJ1c2VyTmFtZSI6IlJhdmkiLCJpYXQiOjE2NjUxMzM2NDZ9.W3uXsFjdLYkcnSghu82dswKnTmr7MlDnpXQx16fSU1g")
    // beforeEach(() => {
    //     render(<Cart />)
    // })

    it("place order button", () => {
    store.getState().user.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJyYXZpQGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWQiOiI2MzMzZjAyZWRjZTJjYWJmYjFhMWE5M2EiLCJ1c2VyTmFtZSI6IlJhdmkiLCJpYXQiOjE2NjUxMzM2NDZ9.W3uXsFjdLYkcnSghu82dswKnTmr7MlDnpXQx16fSU1g"
    store.getState().user.userId = "6333f02edce2cabfb1a1a93a"
    store.getState().user.role = "user"
    console.log("store1",store.getState())
        render(<Cart />)
        console.log("store2",store.getState())
        const btn = screen.getByText('Remove')
        // expect(btn).toBeInTheDocument()
    })
})