import * as React from "react";
import * as Redux from "redux"
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { Hello } from "./components/Hello";
import { Counter } from "./components/counter"
import { Item  } from "./components/item"
import { Store } from "./store/store"
import { reducers } from "./reducers/reducer"

let store: Redux.Store<Store.All> = Redux.createStore(reducers)

let choicess: [string, string][] = [
    ["1", "Hei"],
    ["2", "Hoy"],
    ["A", "Oh boy!"]
]

ReactDOM.render(    
    // <Hello compiler="TypeScript" framework="React" />,
    <Provider store={store}>
        {/*<Counter label = "hei" />*/}
        <Item />
    </Provider>,
    document.getElementById("example")
);

