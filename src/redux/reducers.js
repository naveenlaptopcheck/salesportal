import { combineReducers } from "redux";
import recordReducer from "./recordsReducer";
//import reducer from "./reducer";
// import testReducer from "./testReducer";
// import sideBarReducer from "./sideBarReducer";
// import LoginReducer from "./LoginReducer";
// import SalesReducer from "./SalesReducer";

const reducers = combineReducers({
  recordReducer,
  //  reducer,

  // testReducer,
  // sideBarReducer,
  // LoginReducer,
  // SalesReducer,
});

export default reducers;
