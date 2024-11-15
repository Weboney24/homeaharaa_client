import { createSlice } from '@reduxjs/toolkit';


const cartdSlice = createSlice({
    name: "cart_slice",
    initialState: { value: 0 },
    reducers: {
        UPDATE_CART_COUNT: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { UPDATE_CART_COUNT } = cartdSlice.actions;

export default cartdSlice.reducer;