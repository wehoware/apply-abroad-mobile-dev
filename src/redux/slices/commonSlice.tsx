import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {CommonSliceState} from '../types';
import {lightTheme} from '../../resources/colors/colors';
import {ColorScheme} from '../../types';

const initialState: CommonSliceState = {
  isFetching: false,
  isError: false,
  errorData: {
    status: '',
    statusCode: 0,
    message: '',
  },
  theme: lightTheme,
  mode: 'light',
};

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setIsFetching: (
      state: CommonSliceState,
      action: PayloadAction<boolean>,
    ) => {
      state.isFetching = action.payload;
    },
    setIsError: (state: CommonSliceState, action: PayloadAction<boolean>) => {
      state.isError = action.payload;
    },
    setTheme: (state: CommonSliceState, action: PayloadAction<ColorScheme>) => {
      state.theme = action.payload;
    },
    setMode: (
      state: CommonSliceState,
      action: PayloadAction<'light' | 'dark'>,
    ) => {
      state.mode = action.payload;
    },
    setErrorData: (state: CommonSliceState, action: PayloadAction<any>) => {
      state.errorData = action.payload;
    },
    resetCommonState: () => initialState,
  },
});

export const {
  setIsFetching,
  setIsError,
  setTheme,
  setMode,
  setErrorData,
  resetCommonState,
} = commonSlice.actions;

export default commonSlice.reducer;
