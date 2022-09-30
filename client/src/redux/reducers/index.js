import { combineReducers } from "redux";

import contentVersion from './contentVersion'
import adminAuth from "./adminAuth"

export default combineReducers({
    contentVersion , adminAuth
})
