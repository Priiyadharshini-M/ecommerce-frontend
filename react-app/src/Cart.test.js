import React from 'react';
import ReactDOM from 'react-dom/client';
import { render, act } from '@testing-library/react'

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect"
import { Cart } from './components/Cart';

it("renders without crash", () => {
    const div = document.createElement("div");
    // ReactDOM.render(<Cart></Cart>, div)
    const root = ReactDOM.createRoot(div)
    root.render(<Cart />)
})

describe("button check", () => {
    const initialState = { cartCount: 0};
    const mockStore = configureStore();
    let store;
    //console.log("looo",screen.debug(null, Infinity))

    it("renders button correctly", () => {
        store = mockStore(initialState)
        act(() => {const { queryByTestId } = render(
            <Provider store={store}>
            <BrowserRouter><Routes>
                <Route path="/cart" element={<Cart />} />
        </Routes></BrowserRouter></Provider>)
        expect(queryByTestId('removeButton')).toBeNull();
    })
})
})
// import Enzyme, { shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// import { Cart } from './components/Cart';
// import { renderWithProviders } from 'utils/test-utils'
// Enzyme.configure({ adapter: new Adapter() });

// describe('Cart', () => {
//     it('should show the text', () => {
//         renderWithProviders(<Cart />)
//     const cartInstance = shallow(<Cart />);
//     const button = cartInstance.find('#remove_button');
//     expect(button.text()).toBe('Remove');
//    });
//   });