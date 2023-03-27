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
  }, 1000);
};

/**
 * @description: 创建要插入的span元素
 * @return {HTMLSpanElement}
 */
export const getSpanElement = (
  lastReplyTime: string,
  attrName: string
): HTMLSpanElement => {
  // create span element
  const span = document.createElement("span");
  span.className = "post-time";
  span.innerText = lastReplyTime;
  span.style.alignSelf = "end";
  span.setAttribute(attrName, "");
  return span;
};
