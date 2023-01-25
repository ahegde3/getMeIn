import {checkArraySanity} from "../../helpers/utility"
console.log('This is the background page.');
console.log('Put the background scripts here.');
// var cookies=chrome.cookies
// console.log(cookies)

chrome.runtime.onMessage.addListener(async function (
    request,
    sender,
    sendResponse
  ) { console.log("listner")

  if(request.message == "TEST") console.log("test message recieved")
   else  if (request.message == "give me access") {
console.log("event recieved by background")
sendResponse({ message: "done" });
 getAllCookies()
    } 
   
  });


  async function getAllCookies(){
    console.log("getCookie")
    chrome.cookies.getAll({domain:".medium.com"}, function (cookies) {
               console.log("inside")
        if(checkArraySanity(cookies))
        for(var i=0; i<cookies.length;i++) {
          console.log(cookies[i]);
        }
    else console.log("else case")
    });
}



//   }
//    // console.log(window.location.hostname)
//    // console.log( chrome.cookies)
//    // const domain=window.location.hostname
// //     try{
// //         // chrome.cookies.remove({domain:"medium.com"});
// //         // console.log("cookie cleared")
// //     //     const cookies=  await  chrome.cookies.getAll({domain:"google.com"})
  
// //     //     console.log("inside",cookies)
// //     //     if(checkArraySanity(cookies))
// //     //     for(var i=0; i<cookies.length;i++) {
// //     //       console.log(cookies[i]);
// //     //     }
// //     // else console.log("else case")
    
// // }catch(e){console.log(e)}
// //     //       chrome.cookies.remove({url: "https://" + cookies[i].domain  + cookies[i].path, name: cookies[i].name});
// //     //     }
// //     //   });
// // }


// // chrome.runtime.onConnect.addListener(function(port) {
// //     console.log("Connection established:", port);
// //   });


// //   chrome.action.onClicked.addListener(function (tab) {
// //     console.log("inside")
// //   })


// chrome.runtime.onInstalled.addListener(() => {
// console.log("inside")
//     chrome.runtime.onMessage.addListener(async function (
//     request,
//     sender,
//     sendResponse
//   ) { console.log("listner")
//   console.log(chrome.cookies)
//     if (request.message == "give me access") {
// console.log("event recieved",chrome.cookies )
// sendResponse({ message: "done" });
//  //getAllCookies()
//     } 
   
//   });
// })