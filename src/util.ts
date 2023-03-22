export const getSpanElement = (lastReplyTime: string): HTMLElement => {
    // create span element
    const span = document.createElement("span");
    span.className = "post-time";
    span.innerText = lastReplyTime;
    return span;
};
export const parseResult = (result: PostItem[]) => {
    result?.forEach((item: PostItem) => {
        // get postID and last reply time
        const { id, last_reply_time } = item;
        const element = document.querySelector(
            `.post-brief:has(.content .title[href= "/postDetails/${id}" ]) .top .post-user .bottom`
        );
        console.log("%c Line:29 🍪 element", "color:#ffdd4d", element, `.post-brief:has(.content .title[href= "/postDetails/${id}" ]) .top .post-user .bottom`);

        // get reply time
        const lastReplyTime = getSpanElement(last_reply_time);
        // append reply time to element
        element?.appendChild(lastReplyTime);
    });
}



// // Select the target element
// const targetElement = document.querySelector('#target-element');

// // Create a new MutationObserver object with a callback function
// const observer = new MutationObserver((mutationsList) => {
//   mutationsList.forEach((mutation) => {
//     if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
//       // Handle class name change here
//       console.log('Class name changed:', mutation.target.className);
//     }
//   });
// });

// // Configure the observer to listen for changes to the element's class attribute
// const observerConfig = { attributes: true, attributeFilter: ['class'] };

//     // Start observing the target element
// observer.observe(targetElement, observerConfig);
