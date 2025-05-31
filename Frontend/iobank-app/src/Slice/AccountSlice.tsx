import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Api/api";

const initialState = {
    accountList: [],
    status: 'IDLE',
    recipient: null,
    transations: [],
    exchangeRates: {},   //
};

export const createAccount = createAsyncThunk('account/create', async (accountdata: any) => {
    try {
        const response = await api.post('account/create', accountdata);
        return response.data;
    } catch (error: any) {
        console.log("Error in Creating Account", error.response?.data || error.message);
        throw error;
    }
});

export const getAccount = createAsyncThunk('account/userAccount', async () => {
    try {
        const response = await api.get('account/userAccount');
        return response.data;
    } catch (error: any) {
        console.log("Error in Getting Account", error.response?.data || error.message);
        throw error;
    }
});

export const getRecipient = createAsyncThunk('account/find', async (details: any) => {
    try {
        const response = await api.post('account/find', details);
        return response.data;
    } catch (error: any) {
        console.log("Error in Getting Recipient", error.response?.data || error.message);
        throw error;
    }
});

export const transferFunds = createAsyncThunk('account/transfer', async (transferData: any) => {
    try {
        console.log(`Transfer Data: ${JSON.stringify(transferData)}`);
        const response = await api.post('account/transfer', transferData);
        return response.data;
    } catch (error: any) {
        console.log("Error in Transferring Funds", error.response?.data || error.message);
        throw error;
    }
});

export const depositFunds = createAsyncThunk('account/deposit', async (depositData: any) => {
    try {
        const response = await api.post('account/deposit', depositData);
        return response.data;
    } catch (error: any) {
        console.log("Error in Depositing Funds", error.response?.data || error.message);
        throw error;
    }
});

export const depositToOther = createAsyncThunk('account/depositToOther', async (depositData: any) => {
    try {
        const response = await api.post('account/deposit-to-other', depositData);
        return response.data;
    } catch (error: any) {
        console.log("Error in Depositing to Another Account", error.response?.data || error.message);
        throw error;
    }
});

export const convertCurrency = createAsyncThunk('account/convertCurrency', async (convertData: any) => {
    try {
        const response = await api.post('account/convert', convertData);
        return response.data;
    } catch (error: any) {
        console.log("Error in Converting Currency", error.response?.data || error.message);
        throw error;
    }
});

export const getExchangeRates = createAsyncThunk(
    'account/getExchangeRates',
    async () => {
        try {
            const response = await api.get('account/rates');
            return response.data; // This should be a map of { USD: 1, INR: 83.2, ... }
        } catch (error: any) {
            console.log("Error in Getting Exchange Rates", error.response?.data || error.message);
            throw error;
        }
    }
);

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        resetAccountStatus: (state: any) => {
            state.status = 'IDLE';
        },
        resetRecipient: (state: any) => {
            state.recipient = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createAccount.pending, (state: any) => {
                state.status = 'LOADING';
            })
            .addCase(createAccount.fulfilled, (state: any, action: any) => {
                state.status = 'SUCCEEDED';
                state.accountList.push(action.payload);
            })
            .addCase(createAccount.rejected, (state: any, action: any) => {
                state.status = 'FAILED';
                state.error = action.payload;
            })
            .addCase(getAccount.pending, (state: any) => {
                state.status = 'LOADING';
            })
            .addCase(getAccount.fulfilled, (state: any, action: any) => {
                state.status = 'SUCCEEDED';
                state.accountList = action.payload;
            })
            .addCase(getAccount.rejected, (state: any, action: any) => {
                state.status = 'FAILED';
                state.error = action.payload;
            })
            .addCase(getRecipient.pending, (state: any) => {
                state.status = 'LOADING';
            })
            .addCase(getRecipient.fulfilled, (state: any, action: any) => {
                state.status = 'SUCCEEDED';
                state.recipient = action.payload;
            })
            .addCase(getRecipient.rejected, (state: any, action: any) => {
                state.status = 'FAILED';
                state.error = action.payload;
            })
            .addCase(transferFunds.pending, (state: any) => {
                state.status = 'LOADING';
            })
            .addCase(transferFunds.fulfilled, (state: any, action: any) => {
                state.status = 'SUCCEEDED';
                state.transations.push(action.payload);
            })
            .addCase(transferFunds.rejected, (state: any, action: any) => {
                state.status = 'FAILED';
                console.log("account holder search failed", action.payload);
            })
            .addCase(depositFunds.pending, (state: any) => {
                state.status = 'LOADING';
            })
            .addCase(depositFunds.fulfilled, (state: any, action: any) => {
                state.status = 'SUCCEEDED';
                const updatedAccount = state.accountList.find((acc: any) => acc.code === action.payload.code);
                if (updatedAccount) {
                    updatedAccount.balance += action.payload.amount;
                }
            })
            .addCase(depositFunds.rejected, (state: any, action: any) => {
                state.status = 'FAILED';
                console.log("Deposit failed", action.payload);
            })
            .addCase(depositToOther.pending, (state: any) => {
                state.status = 'LOADING';
            })
            .addCase(depositToOther.fulfilled, (state: any, action: any) => {
                state.status = 'SUCCEEDED';
                const updatedAccount = state.accountList.find((acc: any) => acc.code === action.payload.code);
                if (updatedAccount) {
                    updatedAccount.balance += action.payload.amount;
                }
            })
            .addCase(depositToOther.rejected, (state: any, action: any) => {
                state.status = 'FAILED';
                console.log("Deposit to other failed", action.payload);
            })
            .addCase(convertCurrency.pending, (state: any) => {
                state.status = 'LOADING';
            })
            .addCase(convertCurrency.fulfilled, (state: any, action: any) => {
                state.status = 'SUCCEEDED';
                state.transations.push(action.payload);
            })
            .addCase(convertCurrency.rejected, (state: any, action: any) => {
                state.status = 'FAILED';
                console.log("Currency conversion failed", action.payload);
            })
            .addCase(getExchangeRates.pending, (state: any) => {
                state.status = 'LOADING';
            })
            .addCase(getExchangeRates.fulfilled, (state: any, action: any) => {
                state.status = 'SUCCEEDED';
                state.exchangeRates = action.payload;
            })
            .addCase(getExchangeRates.rejected, (state: any, action: any) => {
                state.status = 'FAILED';
                console.log("Failed to fetch exchange rates", action.payload);
            });

        ;


        ;
    },
});

export const { resetAccountStatus, resetRecipient } = accountSlice.actions;
export const fetchAccount = (state: any) => state.account.accountList;
export const fetchAccountStatus = (state: any) => state.account.status;
export const fetchAccountError = (state: any) => state.account.error;
export const fetchRecipient = (state: any) => state.account.recipient;
export const fetchTransaction = (state: any) => state.account.transaction;
export const fetchExchangeRates = (state: any) => state.account.exchangeRates;




export default accountSlice.reducer;
