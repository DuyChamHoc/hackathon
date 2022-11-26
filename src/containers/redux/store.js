import { configureStore } from "@reduxjs/toolkit"
import Globalreducer from "./Globalreducer";
import CurrentPosition from "./CurrentPosition";
const store = configureStore({
        reducer: {
                Globalreducer: Globalreducer.reducer,
                currentPosition: CurrentPosition.reducer,
        }
})

export default store;