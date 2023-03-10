import { createRoot } from "react-dom/client";
import SubtitleViewer from "@src/components/SubtitleViewer";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { waitForElm } from "@src/helpers";
import getVideoId from "@src/helpers/getVideoId";

refreshOnUpdate("pages/content/components/SubtitleViewer");

let attached = false;
var attachViewer = () => {
  if (attached) {
    return;
  }

  waitForElm("#ytd-player > #container").then((elm) => {
    const subtitleViewerRoot = document.createElement("div");
    elm.append(subtitleViewerRoot);
    createRoot(subtitleViewerRoot).render(<SubtitleViewer />);
  });

  attached = true;
};

// youtube is a SPA, it doesn't navigate properly so we need to watch for a page change to /watch when we start out on youtube.com
if (getVideoId()) {
  attachViewer();
} else {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (oldHref !== document.location.href) {
        oldHref = document.location.href;

        if (getVideoId()) {
          attachViewer();
        }
      }
    });
  });
  observer.observe(body, { childList: true, subtree: true });
}
