import { createRoot } from "react-dom/client";
import App from "@src/pages/content/components/SubtitleViewer/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { waitForElm } from "@src/helpers";

refreshOnUpdate("pages/content/components/Demo");

const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";

waitForElm("#ytd-player > #container").then((elm) => {
  elm.append(root);
});

createRoot(root).render(<App />);
