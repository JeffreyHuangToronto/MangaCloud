/** @format */

import App from "./App.js";
import { Provider } from "react-redux";
import React from "react";
import { registerRootComponent } from "expo";
import store from "./store.js";

const NewRootComponent = () => {
    // console.log("Test");
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

export default registerRootComponent(NewRootComponent);
