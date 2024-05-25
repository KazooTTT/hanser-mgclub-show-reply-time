// ==UserScript==
// @name         hanser-mgclub-evolve
// @namespace    https://github.com/KazooTTT/mgclub-evolve
// @version      0.0.2
// @author       KazooTTT
// @description  展示毛怪俱乐部每个帖子最新的回复时间
// @license      MIT
// @icon         https://github.com/kazoottt.png
// @match        https://2550505.com/
// ==/UserScript==

(function () {
  'use strict';

  const config = {
    getPost: "https://2550505.com/post/list",
    timeout: 500
  };
  const getBottomSelectorByPostId = (id) => `.post-brief:has(.content .title[href="/postDetails/${id}"]) .top .post-user .bottom`;
  const getTopSelectorByPostId = (id) => `.post-brief:has(.content .title[href="/postDetails/${id}"]) .top`;
  function appendResultToDom(result) {
    let attrName;
    result == null ? void 0 : result.forEach((item) => {
      var _a, _b;
      const { id, last_reply_time } = item;
      const topEle = document.querySelector(getTopSelectorByPostId(id));
      const bottomEle = document.querySelector(getBottomSelectorByPostId(id));
      if (!attrName) {
        attrName = (_b = (_a = (bottomEle == null ? void 0 : bottomEle.childNodes[0]).attributes.item(0)) == null ? void 0 : _a.name) != null ? _b : "";
      }
      const lastReplyTimeElement = getSpanElement(last_reply_time, attrName);
      topEle == null ? void 0 : topEle.appendChild(lastReplyTimeElement);
    });
  }
  const handleResult = (result) => {
    const timer = setInterval(() => {
      const skeleton = document.querySelector(
        ".layout-post__main .posts  .post-skeleton"
      );
      if (!skeleton) {
        appendResultToDom(result);
        clearInterval(timer);
      }
    }, config.timeout);
  };
  const getSpanElement = (lastReplyTime, attrName) => {
    const span = document.createElement("span");
    span.className = "post-time";
    let currentTime = /* @__PURE__ */ new Date();
    let lastReplyDate = new Date(lastReplyTime);
    let diffInSeconds = Math.floor((currentTime.getTime() - lastReplyDate.getTime()) / 1e3);
    if (diffInSeconds < 60) {
      span.innerText = `${diffInSeconds}秒前`;
    } else if (diffInSeconds < 3600) {
      let minutes = Math.floor(diffInSeconds / 60);
      let seconds = diffInSeconds % 60;
      span.innerText = `${minutes}分钟${seconds}秒前`;
    } else {
      span.innerText = lastReplyTime;
    }
    span.style.alignSelf = "end";
    span.setAttribute(attrName, "");
    return span;
  };
  function interceptXHR() {
    XMLHttpRequest.prototype.originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
      const xhr = this;
      xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.responseURL.startsWith(config.getPost)) {
            const response = JSON.parse(xhr.response);
            handleResult(response.result);
          }
        }
      };
      xhr.originalSend.apply(xhr, arguments);
    };
  }
  interceptXHR();

})();
