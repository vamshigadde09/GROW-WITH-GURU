import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
<<<<<<< HEAD

=======
import { BrowserRouter } from "react-router-dom";
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
<<<<<<< HEAD
      <React.StrictMode>
        <App />
      </React.StrictMode>
=======
      <App />
>>>>>>> 8316b90 (Initial commit for GROW WITH GURU project)
    </Provider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
