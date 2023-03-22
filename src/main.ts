import { getSpanElement } from "./util";
// @ts-ignore isolatedModules

// Intercept all requests
(XMLHttpRequest.prototype as NewXMLHttpRequest).originalSend =
  XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function () {
  const xhr = this as NewXMLHttpRequest;
  let result = [] as PostItem[];
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.responseURL.startsWith("https://2550505.com/post/list")) {
        const response = JSON.parse(xhr.response);
        result = response.result;
        console.log("%c Line:15 🍅 result", "color:#b03734", result);
      }
    }
  };
  xhr.originalSend.apply(xhr, arguments)

};


