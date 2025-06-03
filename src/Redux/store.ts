import { RootStack } from './../navigation/StackNavigator';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import FilesystemStorage from 'redux-persist-filesystem-storage'
import {
    persistReducer,
    persistStore,
    createMigrate,
  } from 'redux-persist';
import AppSlice from './AppSlice';

const migrations = {
    1: (state: any) => {
      return state
    },
  }
  
const persistConfig = {
    key: 'root',
    version: 1,
    storage: FilesystemStorage,
    blacklist: [],
    timeout: 10000,
    migrate: createMigrate(migrations, { debug: false }),
  };

const rootReducer = combineReducers({
    App: AppSlice.reducer,
  })

const persistedReducer = persistReducer(persistConfig,rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false
      }),
    devTools: true,  
  });

export type RootState = ReturnType< typeof store.getState>
export type AppDispatch = typeof store.dispatch
export * from './AppSlice'

const persistor = persistStore(store);
export { store, persistor };
