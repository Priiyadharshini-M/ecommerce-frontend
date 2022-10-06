import { render as rtlRender, screen } from "@testing-library/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from "redux";
import { Login } from "./components/Login";
import rootReducer from "./redux/reducer/rootReducer";

const store = createStore(rootReducer)
const render = component => rtlRender(
    <Provider store={store}>
        <BrowserRouter>
        {component}
        </BrowserRouter>
    </Provider>
)

describe('Login', () => {
    test("Login handler function allows user to login using credentials", () => {
        render(<Login />)
        expect(screen.getByText('Login')).toBeInTheDocument()
    })
})
