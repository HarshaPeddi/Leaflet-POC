import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './styles/css/index.css'
import { createStore, applyMiddleware,compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';


const persistConfig = {
    key: 'root',
    storage,
    blacklist: [],
    whitelist : [],
    stateReconciler: autoMergeLevel2
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, compose(
    applyMiddleware(thunk)
));
let persistore = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={'Loading'} persistor={persistore}>
            <App />
        </PersistGate>
    </Provider>
   , 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
