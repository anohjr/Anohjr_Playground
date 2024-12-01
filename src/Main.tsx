import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./shared/styles/index.scss";
import { ThemeProvider } from "./contexts/ThemeContext";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <App />
        </ThemeProvider>
    </React.StrictMode>
);
