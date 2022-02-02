import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import thunkMiddleware from 'redux-thunk'
import reducer from './reducer'

import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'e-t-m-bypp--root',
  storage: storage,
  whitelist: ['user']
};

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

const pReducer = persistReducer(persistConfig, reducer);
const store = createStore(pReducer, bindMiddleware([thunkMiddleware]));

const persistor = persistStore(store);
export { persistor, store };