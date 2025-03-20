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
  courseList: [],
  selectedCourse: {},
  appliedCourses: [],
  fromScreen: '',
  applyCourses: [],
  popularColleges: [],
  topCourses: [],
  selectedCollege: {},
  categorieIds: '',
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
    appliedCoursesListFetchRequest: (
      state: AppSliceState,
      action: PayloadAction<{
        count: number;
        page: number;
      }>,
    ) => {},
    appliedCoursesListFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.appliedCourses = action.payload;
    },

    applyCoursesFetchRequest: (
      state: AppSliceState,
      action: PayloadAction<{
        id: number;
      }>,
    ) => {},
    applyCoursesFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.applyCourses = action.payload;
    },
    setSelectedCourse: (state, action: PayloadAction<any>) => {
      state.selectedCourse = action.payload;
    },

    setSelectedCollege: (state, action: PayloadAction<any>) => {
      state.selectedCollege = action.payload;
    },

    setFromScreen: (state, action: PayloadAction<any>) => {
      state.fromScreen = action.payload;
    },
    setCategoriesId: (state, action: PayloadAction<any>) => {
      state.categorieIds = action.payload;
    },
    courseListFetchRequest: (
      state: AppSliceState,
      action: PayloadAction<{
        count: number;
        page: number;
        categoryId: any;
        countryId: number;
      }>,
    ) => {},
    courseListFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.courseList = action.payload;
    },

    popularCollegesListFetchRequest: (
      state: AppSliceState,
      action: PayloadAction<{
        count: number;
        page: number;
        categoryId: any;
      }>,
    ) => {},
    popularCollegesListFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.popularColleges = action.payload;
    },
    topCoursesListFetchRequest: (
      state: AppSliceState,
      action: PayloadAction<{
        count: number;
        page: number;
        categoryId: any;
      }>,
    ) => {},
    topCoursesListFetchSuccess: (
      state: AppSliceState,
      action: PayloadAction<any>,
    ) => {
      state.topCourses = action.payload;
    },

    reviewFetchRequest: (
      state: AppSliceState,
      action: PayloadAction<{
        applicationNumber: any;
        typeId: number;
        type: string;
        rating: number;
        review: string;
      }>,
    ) => {},
    reviewFetchSucess: (state: AppSliceState, action: PayloadAction<any>) => {},
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
  courseListFetchRequest,
  courseListFetchSuccess,
  setSelectedCourse,
  appliedCoursesListFetchRequest,
  appliedCoursesListFetchSuccess,
  setFromScreen,
  setCategoriesId,
  setSelectedCollege,
  applyCoursesFetchRequest,
  applyCoursesFetchSuccess,
  popularCollegesListFetchRequest,
  popularCollegesListFetchSuccess,
  topCoursesListFetchRequest,
  topCoursesListFetchSuccess,
  reviewFetchRequest,
  reviewFetchSucess,
} = appSlice.actions;

export const getConfig = (state: AppSliceState) => state.config;

export default appSlice.reducer;
