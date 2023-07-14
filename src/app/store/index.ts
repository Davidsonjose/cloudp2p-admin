import {
  configureStore,
  ThunkAction,
  Action,
  Reducer,
  combineReducers,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
// api reducers
// import { authReducer } from 'features/auth/api/slice';
import { authReducer } from "@/features/auth/api/slice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { usersReducers } from "@/features/auth/api/users";
import { transactionsReducer } from "@/features/auth/api/transactions";
import { p2pReducer } from "@/features/auth/api/p2p";
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedMarketReducer = persistReducer(persistConfig, assetReducer);
// const persistedAssetReducer = persistReducer(persistConfig, userAssetReducer);
// const persistedKycReducer = persistReducer(persistConfig, userKycReducer);
// const persistedMerchantReducer = persistReducer(persistConfig, merchantReducer);

const reducers = combineReducers({
  // all reducers here
  auths: authReducer,
  users: usersReducers,
  transactions: transactionsReducer,
  p2p: p2pReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

const rootReducer: Reducer = (state, action) => {
  if (action.type === "auths/reset") {
    storage.removeItem("persist:root");
    // storage.removeItem("persist:message");
    state = {};
  }
  return persistedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat
      //all concat here
      (),
});

setupListeners(store.dispatch);
// export type RootState = Return

// export const wrapper = createWrapper(store, { debug: true });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export type AppThunk<ReturnType = void> = ThunkAction ‹
// ReturnType, RootState, unknown, Action<string>>, Action‹string >
// >;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const persistor = persistStore(store);
