import {navigationRef} from '../../App';

export const forceLogout = () => {
  if (navigationRef.isReady()) {
    navigationRef.reset({
      index: 0,
      routes: [
        {
          name: 'Login',
        },
      ],
    });
  }
};
