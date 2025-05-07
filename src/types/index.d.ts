import {
  ActivityIndicatorProps,
  ImageSourcePropType,
  ModalProps,
  StatusBarProps,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {TextInputProps} from 'react-native-paper';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {BottomTabNavigatorProps} from '@react-navigation/bottom-tabs';
import {LegalInfo} from '../redux/types';

export interface ColorScheme {
  primary: string;
  background: string;
  white: string;
  black: string;
  black1: string;
  grey: string;
  grey1: string;
  grey2: string;
  button: string;
  green: string;
  blue: string;
  darkBlue: string;
  placeholderColor: string;
  pink: string;
  error: string;
  green_toaster: string;
  red: string;
  searchPlaceholder: string;
  searchStroke: string;
}

export interface CutsomModalProps extends ModalProps {
  children: React.JSX;
  onPress?: () => void;
}

export interface CustomStatusbarProps extends StatusBarProps {}
export interface CustomHeaderProps extends HeaderProps {
  countryImage: any;
}

export interface LoaderComponentProps extends ActivityIndicatorProps {}

export interface TextInputBoxProps extends TextInputProps {
  isError: boolean;
  errorText: string;
  width?: string;
  height?: string;
  outlineColor?: string;
}

export interface PhoneNumberInputProps extends TextInputBoxProps {
  selectedCountryCode: {
    code: string;
    flag: string;
    countryName: string;
  };
  setSelectedCountryCode: (value: {
    code: string;
    flag: string;
    countryName: string;
  }) => void;
}

export interface OTPInputProps {
  value: string;
  onChangeText: (val: string) => void;
  inputRef: React.Ref<TextInput>;
  isError: boolean;
  errorColor: string;
  activeColor: string;
  inActiveColor: string;
}

export interface CountriesModalProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  setSelectedCountryCode: (value: {
    code: string;
    flag: string;
    countryName: string;
  }) => void;
}

export interface BackgroundImageProps {
  children: React.JSX;
}

export interface DotsComponentProps {
  style: StyleProp<ViewStyle>;
}

export interface PrimaryButtonProps {
  width: string;
  height: string;
  backgroundColor: string;
  onPress: () => void;
  disabled?: boolean;
  children: React.JSX;
  borderRadius?: number;
}

export interface SecondaryButtonProps {
  width: string;
  height: string;
  backgroundColor: string;
  onPress: () => void;
  disabled?: boolean;
  children: React.JSX;
  borderRadius?: number;
}

export interface SlideProps {
  mainText: string;
  subText: string;
  image: ImageSourcePropType;
}

export interface SlideRadioProps {
  screen: string;
}

export interface ButtomWithLogoProps {
  logo: ImageSourcePropType;
  onPress: () => void;
}

export interface CustomBackgroundGradientProps {
  children: React.JSX;
}

export interface TabBarItemComponentProps {
  active: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
}

export interface CustomWebPageProps extends LegalInfo {}

export interface LegalInfoViewProps {
  visible: boolean;
  type: string;
  selected: boolean;
  setSelected: (val: boolean) => void;
  url: string;
  screen: string;
  onClose: () => void;
}

export interface CustomCheckboxProps {
  selected: boolean;
  setSelected: (val: boolean) => void;
  text: string;
  text2?: string;
  onPress: () => void;
}

export interface SubheaderProps {
  title: string;
  onLeftIconPress: () => void;
  rightIcon?: React.JSX;
  onRightIconPress?: () => void;
}

export interface CustomAccordionProps {
  item: {
    id: number;
    question: string;
    answer: string;
    selected: boolean;
  };
  onPress: () => void;
}

export interface ReferFAQProps {
  referFaqs: any[];
  setReferFaqs: (val: any[]) => void;
}

export interface AccountItemCardProps {
  title: string;
  left: React.JSX;
  onPress: () => void;
  right?: React.JSX;
}

export interface CameraOptionsProps {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onRemovePress: () => void;
}

export interface CameraOptionsItemProps {
  icon: React.JSX;
  title: string;
  onPress: () => void;
}

export interface CartItemProps {
  item: any;
  index: number;
}

export interface CustomRadioButtonProps {
  selected: boolean;
  onPress: () => void;
  color: string;
}

export interface CustomInfoItemProps {
  title: string;
  answer: string;
  show: boolean;
  setShow: (val: boolean) => void;
  type?: string;
}

export interface ProductImageCarouselProps {
  imagesData: any;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  refreshing: boolean;
}

export interface ProductItemViewProps {
  category: string;
}
export interface NodataProps {
  width?: any;
  height?: any;
}
export interface DropdownProps {
  data: any;
  show: boolean;
  setShow: (val: boolean) => void;
  selected: string;
  onPress: () => void;
  onPressItem: (item: any, index: number) => void;
  width?: string;
  height?: string;
  type?: string;
}

export interface HistoryFilterProps {
  showFilter: boolean;
  setShowFilter: (value: boolean) => void;
  monthsData: any;
  categoriesData: any;
  selectedMonth: string;
  selectedCategory: string;
  setSelectedMonth: (value: string) => void;
  setSelectedCategory: (value: string) => void;
  getHistoryBasedonMonth: () => void;
  getHistoryData: () => void;
  headings: HistoryHeadingItemProps[];
  setHeadings: (val: HistoryHeadingItemProps[]) => void;
}

export interface HistoryHeadingItemProps {
  id: number;
  name: string;
  value?: string;
  selected: boolean;
}

export interface HistoryHeadingProps {
  data: HistoryHeadingItemProps[];
  selected: string;
  setSelected: (value: string) => void;
  selectedCategory: string;
  selectedMonth: string;
}

export interface HistoryRowProps {
  item: HistoryHeadingItemProps;
  index: number;
  option: string;
  data: any;
  refresh: boolean;
  setData: (value: any) => void;
  setRefresh: (value: boolean) => void;
  setSelectedItem: (value: any) => void;
  setSelectedIndex: (value: number) => void;
  setSelectedMonth: (value: string) => void;
  setSelectedcategory: (value: string) => void;
  selected: string;
  headings: HistoryHeadingItemProps[];
  setHeadings: (value: HistoryHeadingItemProps[]) => void;
}

export interface OrderHistoryItemRenderProps {
  item: any;
  index: number;
  onPress: (index: number) => void;
  onOrderAgainPress: (productId: string) => void;
  onRateProductPress: (productId: string) => void;
}

export interface MFAProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  onVerifyPress: (value: string) => void;
}

export const PERMISSION_VALUES = {
  Gallery: 'Gallery',
  Camera: 'Camera',
} as const;

export type PERMISSION_VALUE = keyof typeof PERMISSION_VALUES;

export interface HomeCustomBackgroundProps {
  backgroundColor: string;
  type?: string;
  bg?: string;
  title: string;
  products: any[];
}

export interface DynamicHomeRenderItemProps {
  products: any[];
  type?: string;
}
