/* eslint-disable @typescript-eslint/no-unused-vars */
import {StackNavigatorList, stackProps} from '../navigation/types';
import {ColorScheme} from '../types';

export interface CommonSliceState {
  isFetching: boolean;
  isError: boolean;
  errorData: {
    status: string | boolean;
    statusCode: number;
    message: string;
  };
  theme: ColorScheme;
  mode: 'light' | 'dark';
}

export interface UserState {
  phoneNumber: any;
  id: number;
  email: string;
  fullName: string;
  role: string;
  countryCode?: string;
  loginMethod?: string;
  status: string;
  intrestedCountry?: number;
  interestedCountryId: any;
  interestedFields?: [];
  socialLogins?: [];
  accessToken?: string;
  refreshToken?: string;
  profilePic?: string;
  StudentEducation?: any;
  profilePhoto?: string;
  dob?: string;
  Country?: {
    id?: number;
    name?: string;
    flagImage?: string;
    code?: string;
    isDeleted?: boolean;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
  };
  interestedFieldsIds?: [];
}

export interface LegalInfo {
  type: string;
  show: boolean;
  url: string;
}

export interface AuthSliceState {
  userData: UserState;
  isLogged: boolean;
  redirect: string | null;
  showForgotPasswordText: boolean;
  redirectForgot: boolean;
  legalInfo: LegalInfo;
  selectedEducation: any;
}

export interface ConfigRequestPayload {
  AWS_REGION: string;
  AWS_BUCKET_NAME: string;
  AWS_SECRET_KEY: string;
  AWS_ACCESS_KEY: string;
}

export interface AppSliceState {
  countries: any[];
  config: ConfigRequestPayload;
  categories: any[];
  selectedCategory: SelectedCategoryPayload;
  scoreTypes: any[];
  institutionList: InstitutionList[];
  universityList: any[];
  courseList: any[];
  selectedCourse: any;
  appliedCourses: any[];
  fromScreen: string;
  applyCourses: any[];
  popularColleges: any[];
  selectedCollege: any;
  topCourses: any[];
  categorieIds: any;
}

export interface CustomerProfileUpdateRequestPayload {
  id: string;
  updateData: {
    firstName: string;
    lastName: string;
    email: string;
    profilePic?: string;
  };
}

export interface UploadToAWSRequestPayload {
  userId: string;
  file: {
    name: string;
    uri: string;
    type: string;
  };
}

export interface HomeData {
  productShowcase1?: {
    title: string;
    products: any[];
    isPublished: boolean;
    bg?: string;
    bgType?: string;
  };
  productShowcase2?: {
    title: string;
    products: any[];
    isPublished: boolean;
    bg?: string;
    bgType?: string;
  };
  productShowcase3?: {
    title: string;
    products: any[];
    isPublished: boolean;
    bg?: string;
    bgType?: string;
  };
  productShowcase4?: {
    title: string;
    products: any[];
    isPublished: boolean;
    bg?: string;
    bgType?: string;
  };
  productShowcase5?: {
    title: string;
    products: any[];
    isPublished: boolean;
    bg?: string;
    bgType?: string;
  };
  productShowcase6?: {
    title: string;
    products: any[];
    isPublished: boolean;
    bg?: string;
    bgType?: string;
  };
}

export interface SelectedCategoryPayload {
  _id: string;
  categoryName: string;
  description: string;
  icon: string;
}
export interface InstitutionList {
  id: number;
  name: string;
  institutionType: string;
  isStandalone: boolean;
  parentInstitutionId?: number;
  about: string;
  phoneNumber?: string;
  email?: string;
  locationId: Array;
  mainImage?: string;
  otherImages?: Array;
  website?: string;
  rating: number;
  ratingCount: number;
  appliedCount: number;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
