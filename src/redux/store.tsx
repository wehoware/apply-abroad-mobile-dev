import {configureStore} from '@reduxjs/toolkit';
import commonReducer from './slices/commonSlice';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas/rootSaga';
import reactotron from '../../ReactotronConfig';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth: authReducer,
    app: appReducer,
  },
  enhancers: getDefaultEnhancers =>
    getDefaultEnhancers().concat(reactotron.createEnhancer()),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({thunk: false}).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
