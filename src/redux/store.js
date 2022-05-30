import { createStore } from "redux";

import reducers from "./reducers";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from "redux-persist";

// const store = createStore(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer);

export default store;
