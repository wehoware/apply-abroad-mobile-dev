import React from 'react';
import {ActivityIndicator} from 'react-native';
import {LoaderComponentProps} from '../types';

const LoaderComponent: React.FC<LoaderComponentProps> = props => {
  return <ActivityIndicator {...props} />;
};

export default LoaderComponent;
