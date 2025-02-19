/* eslint-disable @typescript-eslint/no-unused-vars */
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
  scoreTypes: [],
  selectedCategory: {
    _id: '',
    categoryName: '',
    description: '',
    icon: '',
  },
  institutionList: [],
  universityList: [],
};

const appSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    countriesFetchRequest: () => {},
    countriesFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.countries = action.payload;
    },
    scoreTypesFetchRequest: () => {},
    scoreTypesFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.scoreTypes = action.payload;
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
    institutionListFetchRequest: (
      state: AppSliceState,
      action: PayloadAction<{
        count: number;
        page: number;
      }>,
    ) => {},
    institutionListFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.institutionList = action.payload;
    },

    universityListFetchRequest: (
      state: AppSliceState,
      action: PayloadAction<{
        count: number;
        page: number;
      }>,
    ) => {},
    universityListFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.universityList = action.payload;
    },
  },
});

export const {
  countriesFetchRequest,
  countriesFetchSuccess,
  updateConfig,
  categoriesFetchRequest,
  categoriesFetchSuccess,
  scoreTypesFetchRequest,
  scoreTypesFetchSuccess,
  institutionListFetchRequest,
  institutionListFetchSuccess,
  universityListFetchRequest,
  universityListFetchSuccess,
} = appSlice.actions;

export const getConfig = (state: AppSliceState) => state.config;

export default appSlice.reducer;
