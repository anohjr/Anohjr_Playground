import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./shared/styles/index.scss";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("root")!);

root.render(
    <React.StrictMode>
        <TooltipProvider>
            <App />
        </TooltipProvider>
    </React.StrictMode>
);
