console.log('content script');

chrome.runtime.sendMessage({
  url: window.location.href,
  message: 'TEST',
});

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {

  if (request.message == 'give me access') {


    let domain;
    if(request.type == "medium")
    domain='medium.com';
    else domain= window.location.hostname

    chrome.runtime.sendMessage(
      {
        message: 'give me access',
        domain: domain,
      },
      function (response) {
        sendResponse({ message: 'done' });
      }
    );
  }
});
