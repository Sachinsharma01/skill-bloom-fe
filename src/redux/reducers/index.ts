import { combineReducers } from "redux";
import tokenReducer from "./tokenReducer";
import metaDataReducer from "./metaDataReducer";
const rootReducer = combineReducers({
    tokenReducer,
    metaDataReducer
})

export default rootReducer;