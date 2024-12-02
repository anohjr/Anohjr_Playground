import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./shared/styles/index.scss";
import { ThemeProvider } from "./contexts/ThemeContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <ThemeProvider>
            <TooltipProvider>
                <App />
            </TooltipProvider>
        </ThemeProvider>
    </React.StrictMode>
);
