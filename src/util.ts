import { config } from "./config";

/**
 * @description: postId对应bottom selector
 * @param {string} id
 */
const getBottomSelectorByPostId = (id: string | number) =>
  `.post-brief:has(.content .title[href="/postDetails/${id}"]) .top .post-user .bottom`;

/**
 * @description: postId对应top selector
 * @param {string} id
 */
const getTopSelectorByPostId = (id: string | number) =>
  `.post-brief:has(.content .title[href="/postDetails/${id}"]) .top`;

/**
 * @description:将请求结果插入到dom中
 * @param {PostItem} result
 * @return {*}
 */
function appendResultToDom(result: PostItem[]) {
  let attrName: string;
  result?.forEach((item: PostItem) => {
    // get postID and last reply time
    const { id, last_reply_time } = item;

    // target element to append
    const topEle = document.querySelector(getTopSelectorByPostId(id));

    const bottomEle = document.querySelector(getBottomSelectorByPostId(id));

    if (!attrName) {
      // get attributes
      attrName =
        (bottomEle?.childNodes[0] as HTMLElement).attributes.item(0)?.name ??
        "";
    }
    // get lastReplyTime
    const lastReplyTimeElement = getSpanElement(last_reply_time, attrName);

    // append reply time to element
    topEle?.appendChild(lastReplyTimeElement);
  });
}

/**
 * @description: 处理请求结果
 * @param {PostItem} result
 */
export const handleResult = (result: PostItem[]) => {
  const timer = setInterval(() => {
    // 骨架屏元素
    const skeleton = document.querySelector(
      ".layout-post__main .posts  .post-skeleton"
    );
    if (!skeleton) {
      appendResultToDom(result);
      clearInterval(timer);
    }
  }, config.timeout);
};

/**
 * @description: 创建要插入的span元素
 * @return {HTMLSpanElement}
 */
export const getSpanElement = (
  lastReplyTime: string, // 格式2024-05-25 20:16:09 
  attrName: string
): HTMLSpanElement => {
  // create span element
  const span = document.createElement("span");
  span.className = "post-time";
  let currentTime = new Date();
  let lastReplyDate = new Date(lastReplyTime); // assuming lastReplyTime is a valid date string
  let diffInSeconds = Math.floor((currentTime.getTime() - lastReplyDate.getTime()) / 1000);

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