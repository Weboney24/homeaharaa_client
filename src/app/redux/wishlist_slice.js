import { createSlice } from '@reduxjs/toolkit'

const wishlistSlice = createSlice({
    name: "wishlist_slice",
    initialState: { value: 0 },
    reducers: {
        UPDATE_WISHLIST_COUNT: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { UPDATE_WISHLIST_COUNT } = wishlistSlice.actions;

export default wishlistSlice.reducer;