import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Api from '../Api/api';
import apis from '../Api/apis';



const initialState = {
  user: JSON.parse(sessionStorage.getItem('user') || '{}'),
  status: 'IDLE'
}


export const registerUser = createAsyncThunk("user/register", async (userDetails: any) => {
  try {

    const { data, error } = await Api.post('user/register', userDetails)
    if (error) throw error;
    return data;

  } catch (error) {
    console.log("Error in Registering User", error);

  }
})

export const fetchUserProfile = createAsyncThunk("user/profile", async () => {
  try {
    const response = await apis.get("user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile", error);
    throw error;
  }
});



export const loginUser = createAsyncThunk("user/login", async (userDetails: any) => {
  try {
    const response = await Api.post('user/login', userDetails);
    const { data, headers } = response;

    const authorization = headers['authorization']; //  correct way to access header

    if (!authorization) {
      throw new Error("Authorization token not found in headers.");
    }

    sessionStorage.setItem('access_token', authorization);
    sessionStorage.setItem('user', JSON.stringify(data));

    console.log(`Authorization Header: ${authorization}`);
    return data;

  } catch (error) {
    console.error("Error in Logging User", error);
    throw error; // to trigger rejected state
  }
});


export const userSlice = createSlice({

  name: 'user',
  initialState,
  reducers: {
    resetStatus: (state: any) => {
      state.status = 'IDLE'
    }
  },

  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state: any) => {
        state.status = 'LOADING';
      })
      .addCase(registerUser.fulfilled, (state: any, action: any) => {
        state.status = 'SUCCESS';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state: any) => {
        state.status = 'FAILED';
      });


    builder
      .addCase(loginUser.pending, (state: any) => {
        state.status = 'LOADING';
      }
      )
      .addCase(loginUser.fulfilled, (state: any, action: any) => {
        state.status = 'SUCCESS';
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state: any) => {
        state.status = 'FAILED';
      });

    builder
      .addCase(fetchUserProfile.pending, (state: any) => {
        state.status = 'LOADING';
      })
      .addCase(fetchUserProfile.fulfilled, (state: any, action: any) => {
        state.status = 'SUCCESS';
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state: any) => {
        state.status = 'FAILED';
      });



  },

})

export const { resetStatus } = userSlice.actions;
export const fetchUser = (state: any) => state.user.user;
export const fetchUserStatus = (state: any) => state.user.status;

export default userSlice.reducer;
