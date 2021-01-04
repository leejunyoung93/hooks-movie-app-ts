import React, { useEffect } from "react";
import { Provider } from "react-redux";
import "./App.scss";
import { store } from "store";
import { Header, Search, Movie } from "components";

const App = () => {
    return <Provider store={store}></Provider>;
};

export default App;
