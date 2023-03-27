// @ts-ignore isolatedModules
import { config } from "./config";
import { handleResult } from "./util";

/**
 * @description: 重写XMLHttpRequest send方法(实现请求拦截)
 * @return {*}
 */
function interceptXHR() {
  // 保存原始send方法
  (XMLHttpRequest.prototype as NewXMLHttpRequest).originalSend = XMLHttpRequest.prototype.send;
  // 重写send方法
  XMLHttpRequest.prototype.send = function () {
    const xhr = this as NewXMLHttpRequest;
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        // save the response
        if (xhr.responseURL.startsWith(config.getPost)) {
          const response = JSON.parse(xhr.response);
          handleResult(response.result)
        }
      }
    };
    xhr.originalSend.apply(xhr, arguments);
  };
}


const main = () => {
  interceptXHR()
}

main()

