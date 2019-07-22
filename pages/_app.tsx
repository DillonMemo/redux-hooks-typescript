import React from 'react';
import Head from 'next/head';

import withRedux from 'next-redux-wrapper';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const App = ({ Component, store, pageProps }) => {
    return (
        <Provider store={store}>
            <Head>
                <title>redux hooks typescript Ex</title>
            </Head>
            <div>
                <Component {...pageProps}/>
            </div>
        </Provider>
    );
};

App.getInitialProps = async({ Component, ctx }) => {
    let pageProps = {};
    if(Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
}

export default withRedux(() => {
    const middlewares = [];
    //const enhancer = compose(applyMiddleware(...middlewares));
    const enhancer = process.env.NODE_ENV === 'development'
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares));
    
    const store = createStore(reducer, enhancer);
    
    return store;
})(App);