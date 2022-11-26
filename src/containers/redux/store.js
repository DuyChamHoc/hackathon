import { configureStore } from "@reduxjs/toolkit"
import Globalreducer from "./Globalreducer";
const store = configureStore({
        reducer: {
                Globalreducer: Globalreducer.reducer
        }
})

export default store;