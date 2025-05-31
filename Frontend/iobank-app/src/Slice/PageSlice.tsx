import { createSlice } from "@reduxjs/toolkit"

const initialState = {

    showLoader: false,
    LoaderDelay : 3000,
    openNavbar: false,
}


export const pageSlice = createSlice({
    name: 'page',
    initialState,
    reducers: {
        openLoader: (state) => {
            state.showLoader = true;
        },
        closeLoader: (state) => {
            state.showLoader = false;
        },
        toggleNavbar: (state) => {
            state.openNavbar = ! state.openNavbar; 
        }
    }

})
export const { openLoader, closeLoader, toggleNavbar } = pageSlice.actions;
export const showLoader = (state: any) => state.page.showLoader;
export const openNavbar = (state: any) => state.page.openNavbar;
export const LoaderDelay = (state: any) => state.page.LoaderDelay;

export default pageSlice.reducer;