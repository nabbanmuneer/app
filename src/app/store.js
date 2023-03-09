import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import { persistReducer, persistStore } from 'redux-persist';
import { apiSlice } from "./api/apiSlice";
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'

const userPersistConfig = {
  key: 'user',
  storage: storageSession,
}



const persistedReducer = persistReducer(userPersistConfig, authReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({serializableCheck: false}).concat(apiSlice.middleware),
devTools: true,
})

export const persistor = persistStore(store)
