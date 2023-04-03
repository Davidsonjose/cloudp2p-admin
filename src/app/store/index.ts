import { configureStore, Reducer, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
// api reducers
// import { authReducer } from 'features/auth/api/slice';
import { authReducer } from '@/features/auth/api/slice';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	version: 1,
	storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const appReducer = combineReducers({
	// all reducers here
	auths: persistedAuthReducer,
});

const rootReducer: Reducer = (state, action) => {
	if (action.type === 'auths/reset') {
		storage.removeItem('persist:root');
		// storage.removeItem("persist:message");
		state = {};
	}
	return appReducer(state, action);
};

export const Store = configureStore({
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

setupListeners(Store.dispatch);
export const persistor = persistStore(Store);

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
