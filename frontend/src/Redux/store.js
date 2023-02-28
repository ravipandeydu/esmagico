import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from "redux";
import { authReducer } from "./auth/auth.reducer";
import thunk from "redux-thunk";
import { usersReducer } from "./users/users.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer
});

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = legacy_createStore(
  rootReducer,
  createComposer(applyMiddleware(thunk))
);

export { store };
