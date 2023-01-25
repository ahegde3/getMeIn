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
  console.log('content listner');
  if (request.message == 'give me access') {
    console.log('event recieved by content');
    chrome.runtime.sendMessage(
      {
        message: 'give me access',
        domain: window.location.hostname,
      },
      function (response) {
        sendResponse({ message: 'done' });
      }
    );
  }
});
