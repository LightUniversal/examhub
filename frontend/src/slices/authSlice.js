// set and remove user credentails to the local storage
import { createSlice } from "@reduxjs/toolkit";

if(localStorage.getItem("userDetails") === "undefined") {
    localStorage.setItem("userDetails", null);
}
const initialState = {
    userinfo: localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null
};

// create slice
const authSlice = new createSlice({
    name:"auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userinfo = action.payload;
            localStorage.setItem('userDetails', JSON.stringify(action.payload));
        } ,
        logout: (state, action) => {
            state.userinfo = null;
            localStorage.removeItem("userDetails");
        },
        register: (state, action) => {
            state.userinfo = action.payload;
        }
    }
});


export const { setCredentials, logout, register } = authSlice.actions;
export default authSlice.reducer;