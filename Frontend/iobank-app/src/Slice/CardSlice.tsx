import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Api/api";
import creditCardImage from "../assets/Card.png"

const initialState = {
    card: null,
    transactions: [], // ✅ correct
    status: 'IDLE',
}

export const getCard = createAsyncThunk('card/getCard', async () => {
    try {
        const response = await api.get('/card/getCard');
        return response.data;
    } catch (error: any) {
        console.log("Error in getting card info", error.response?.data || error.message);
        throw error;
    }
});

export const createCard = createAsyncThunk('card/create', async ({ accountCode, amount }: { accountCode: string, amount: number }) => {
    const response = await api.post(`/card/create?accountCode=${accountCode}&amount=${amount}`, null, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
});

export const creditCard = createAsyncThunk('card/credit', async ({ amount }: { amount: number }) => {
    const response = await api.post(`/card/credit?amount=${amount}`, null, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
});


export const debitCard = createAsyncThunk('card/debit', async ({ amount }: { amount: number }) => {
    const response = await api.post(`/card/debit?amount=${amount}`, null, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
});


const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        addTransaction: (state: any, action: any) => {
            state.transations.push(action.payload);
        },
        resetCardStatus: (state: any) => {
            state.status = 'IDLE'
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCard.pending, (state: any) => {
            state.status = 'LOADING';
            })
            .addCase(createCard.fulfilled, (state: any, action: any) => {
            console.log('Card Created SuccessFul');
            console.log(action.payload);
            state.card = { ...action.payload, img: creditCardImage };
            if (state.transactions) {
                state.transactions.push(action.payload);
            }
            state.status = 'SUCCEEDED';
            })
            .addCase(createCard.rejected, (state: any, action: any) => {
            state.status = 'FAILED';
            state.error = action.payload;
            })
            .addCase(getCard.pending, (state: any) => {
            state.status = 'LOADING';
            })
            .addCase(getCard.fulfilled, (state: any, action: any) => {
            state.card = action.payload;
            state.status = 'SUCCEEDED';
            state.card = {...action.payload , img : creditCardImage}
            })
            .addCase(getCard.rejected, (state: any, action: any) => {
            state.status = 'FAILED';
            state.error = action.payload;
            })
            .addCase(creditCard.pending, (state: any) => {
            state.status = 'LOADING';
            })
            .addCase(creditCard.fulfilled, (state: any, action: any) => {
            state.card = action.payload;
            state.transactions.push(action.payload); // ✅ correct

            state.status = 'SUCCEEDED';
            })
            .addCase(creditCard.rejected, (state: any, action: any) => {
            state.status = 'FAILED';
            state.error = action.payload;
            })
            .addCase(debitCard.pending, (state: any) => {
            state.status = 'LOADING';
            })
            .addCase(debitCard.fulfilled, (state: any, action: any) => {
            state.card = action.payload;
            state.transactions.push(action.payload);
            state.status = 'SUCCEEDED';
            })
            .addCase(debitCard.rejected, (state: any, action: any) => {
            state.status = 'FAILED';
            state.error = action.payload;
            })
        }
    }
)

export const {resetCardStatus}  = cardSlice.actions;
export default cardSlice.reducer;

export const fetchCardStatus = (state:any) =>  state.card.status
export const fetchCard =  (state :any) => state.card.card


