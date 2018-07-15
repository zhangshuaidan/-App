import React from 'react';
import 'antd-mobile/dist/antd-mobile.css'; 
import ReactDom from 'react-dom'
import {Provider} from 'react-redux'



import {
    BrowserRouter,
    Route,
    Switch} from 'react-router-dom'; 
import  thunk from 'redux-thunk'
import BossInfo from './container/bossinfo/bossinfo'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import AuthRoute from './component/authroute/authroute'
import {createStore,applyMiddleware,compose} from 'redux'
import "./config"
import './index.css'
import reducers from './reducers';
import App from './app'
// const reduxDevtools = window.devToolsExtension ? window.devToolsExtension():f=>{}
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
) )

// boss genius me msg 4 个页面

ReactDom.render(
    (<Provider store={store}> 
         <BrowserRouter>
            <div>
                <App/>
            </div>

    
        </BrowserRouter>   
    </Provider>),
    document.getElementById("root") 
)

