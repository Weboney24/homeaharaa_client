import { createSlice } from '@reduxjs/toolkit'

const CountrySlice = createSlice({
    name: "country_slice",
    initialState: { value: {} },
    reducers: {
        LOAD_COUNTRY_DATAS: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { LOAD_COUNTRY_DATAS } = CountrySlice.actions

export default CountrySlice.reducer;