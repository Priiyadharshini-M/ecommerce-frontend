import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from "./reducer/rootReducer";

export const store = createStore(rootReducer, applyMiddleware(thunk,logger))