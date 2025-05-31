import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Api/api";


const initialState = {

  transactionList: [], // ✅ correct
  status: 'IDLE',
}

export const getTransactions = createAsyncThunk('transactions/all', async (pageNumber: any) => {
  try {
    const response = await api.get(`/transactions/all?page=${pageNumber}`);
    return response.data;
  } catch (error: any) {
    console.log("Error in getting card info", error.response?.data || error.message);
    throw error;
  }
});

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
     resetTransactionStatus: (state: any) => {
     
      state.status = 'IDLE'

    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.status = 'LOADING';

      })
      .addCase(getTransactions.fulfilled, (state, action) => {
       
        
        state.transactionList = action.payload.sort((a: { initiated: string }, b: { initiated: string }) => {
          const dateA = new Date(a.initiated);
          const dateB = new Date(b.initiated);
          return dateA.getTime() - dateB.getTime();
        })
        
        
        state.status = 'SUCCEEDED';
      })
      .addCase(getTransactions.rejected, (state) => {
        state.status = 'FAILED';

      });
  },
});

export const { resetTransactionStatus } = transactionSlice.actions;

export const fetchTransactionsList = (state: any) => state.transaction.transactionList
export const fetchTransactionStatus = (state: any) => state.transaction.status


export default transactionSlice.reducer;