import ReactDOM from 'react-dom/client';
import { BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux"

import store from "./utils/Storage/ReduxStore/Store"
import App from './App';

const root = ReactDOM.createRoot(
  document.querySelector("#root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App></App>
    </BrowserRouter>
  </Provider>
);