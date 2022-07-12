import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  errorMessage: '',
  currentUser: null,
};

// Fetch API
export const login = createAsyncThunk(
  'user/login',
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      'https://fake-rest-api-nodejs.herokuapp.com/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const jsonData = await response.json();
    for (var key in jsonData) {
      if (jsonData.hasOwnProperty(key)) {
        console.log(key, jsonData[key])
      }
    }

    if (response.status < 200 || response.status >= 300) {
      console.log('abc');
      const a = rejectWithValue(jsonData);
      console.log(typeof a);

      for (var key in a) {
        if (a.hasOwnProperty(key)) {
          console.log(key, a[key])
        }
      }
      return rejectWithValue(jsonData);
    }

    return jsonData;
  }
);

// Config slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    // Start login request
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });

    // Request successful
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    });

    // Request error
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    });
  },
});

// Export actions
export const { logout } = userSlice.actions;

// Select state currentUser from slice
export const selectUser = (state) => state.user.currentUser;
export const selectLoading = (state) => state.user.isLoading;
export const selectErrorMessage = (state) => state.user.errorMessage;

// Export reducer
export default userSlice.reducer;
