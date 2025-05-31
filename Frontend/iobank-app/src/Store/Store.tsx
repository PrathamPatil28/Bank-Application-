import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Slice/UserSlice';
import pageReducer from '../Slice/PageSlice';
import accountReducer from '../Slice/AccountSlice'
import cardReducer from '../Slice/CardSlice'
import transactionsReducer from "../Slice/TransactionSlice"

const store = configureStore({
  reducer: {
    user: userReducer,
    page : pageReducer,
    account : accountReducer,
    card : cardReducer,
    transaction: transactionsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 

export default store;
