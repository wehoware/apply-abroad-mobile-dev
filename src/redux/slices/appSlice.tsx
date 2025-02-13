import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppSliceState, ConfigRequestPayload} from '../types';

const initialState: AppSliceState = {
  countries: [],
  config: {
    AWS_ACCESS_KEY: '',
    AWS_BUCKET_NAME: '',
    AWS_REGION: '',
    AWS_SECRET_KEY: '',
  },
  categories: [],

  selectedCategory: {
    _id: '',
    categoryName: '',
    description: '',
    icon: '',
  },
};

const appSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    countriesFetchRequest: () => {},
    countriesFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.countries = action.payload;
    },
    updateConfig: (
      state: AppSliceState,
      action: PayloadAction<ConfigRequestPayload>,
    ) => {
      state.config = action.payload;
    },
    categoriesFetchRequest: () => {},
    categoriesFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.categories = action.payload;
    },
  },
});

export const {
  countriesFetchRequest,
  countriesFetchSuccess,
  updateConfig,
  categoriesFetchRequest,
  categoriesFetchSuccess,
} = appSlice.actions;

export const getConfig = (state: AppSliceState) => state.config;

export default appSlice.reducer;
