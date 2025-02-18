import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./root-reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage engine (localStorage or sessionStorage)
import logger from "redux-logger";

// Middleware setup
const middleWares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean);

// Persist config
const persistConfig = {
  key: "root",
  storage, // Use localStorage or sessionStorage
  whitelist: ["user"], // List reducers you want to persist
};

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(middleWares),
});

// Persistor (used for rehydrating the store)
export const persistor = persistStore(store);
