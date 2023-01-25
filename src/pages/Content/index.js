

// chrome.runtime.onMessage.addListener(async function (
//     request,
//     sender,
//     sendResponse
//   ) { console.log("listner")
//   console.log(chrome.cookies)
//     if (request.message == "give me access") {
// console.log("event recieved",chrome.cookies )
// console.log(document.cookie)
// sendResponse({ message: "done" });
// //  getAllCookies()
//     } 
   
//   });
console.log("content script")
try{
chrome.runtime.sendMessage({
    url: window.location.href,
    message: "TEST",
  });

  chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) { console.log("content listner")
 if (request.message == "give me access") {
console.log("event recieved by content" )
chrome.runtime.sendMessage({
    message: 'give me access',
    domain: window.location.hostname,
  },function (response) {
    sendResponse({ message: "done" });
  });
    } 
   
  });
}
catch(e){console.log(e)}