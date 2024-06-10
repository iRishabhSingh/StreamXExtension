/* eslint-disable no-undef */
let popupWindowId = null;

chrome.action.onClicked.addListener(async () => {
  try {
    const windows = await chrome.windows.getAll({ populate: true });

    const popupAlreadyExists = windows.some((window) => {
      if (window.id === popupWindowId) {
        chrome.windows.update(popupWindowId, { focused: true });
        return true;
      }
      return (
        window.type === "popup" &&
        window.tabs.some((tab) => {
          return tab.url === chrome.runtime.getURL("index.html");
        })
      );
    });

    if (!popupAlreadyExists) {
      const popupWindow = await chrome.windows.create({
        url: chrome.runtime.getURL("index.html"),
        type: "popup",
        width: 800,
        height: 500,
      });
      popupWindowId = popupWindow.id;
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
});

chrome.windows.onRemoved.addListener((windowId) => {
  if (windowId === popupWindowId) {
    popupWindowId = null;
  }
});
