import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = (state = {isAuthenticated: false}, action) => {
  return state;
}

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

