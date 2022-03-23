import { combineReducers } from "redux"
import safeReducers from "./safeReducer"

const reducers = combineReducers({
  safes: safeReducers,
})

export default reducers