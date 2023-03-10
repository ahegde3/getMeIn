import { checkArraySanity } from '../../helpers/utility';
console.log('This is the background page.');
console.log('Put the background scripts here.');

chrome.runtime.onMessage.addListener(async function (
  request,
  sender,
  sendResponse
) {


  if (request.message == 'TEST') console.log('test message recieved');
  else if (request.message == 'give me access') {

    sendResponse({ message: 'done' });
    getAllCookies(request.domain);
  }
});

async function getAllCookies(domain) {
  console.log('getCookie', domain);

  chrome.cookies.getAll({ domain: domain }, function (cookies) {
    console.log('inside');
    if (checkArraySanity(cookies)) {
      for (var i = 0; i < cookies.length; i++) {
        console.log(cookies[i]);
        chrome.cookies.remove({
          url: 'https://' + cookies[i].domain + cookies[i].path,
          name: cookies[i].name,
        });
      }
      tabReload();
    } 
  });
}

function tabReload() {
  console.log('tabReload');
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    var code = 'window.location.reload();';
    chrome.tabs.reload(tab.id);
  });
}
