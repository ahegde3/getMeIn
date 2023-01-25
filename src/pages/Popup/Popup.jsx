import React from 'react';
import './Popup.css';

const Popup = () => {
  return (
    <div className="App">
      {console.log('popup')}
      <button
        onClick={async () => {
          console.log('button click');

          chrome.tabs.query(
            { active: true, currentWindow: true },
            async function (tabs) {
              // const cookies = await chrome.cookies.getAll({
              //   domain: 'google.com',
              // });
              // console.log(cookies);
              chrome.tabs.sendMessage(
                tabs[0].id,
                {
                  message: 'give me access',
                  domain: window.location.hostname,
                },
                function (response) {
                  console.log(
                    `message from background: ${JSON.stringify(response)}`
                  );
                }
              );
            }
          );
        }}
      >
        Give me access
      </button>
    </div>
  );
};

export default Popup;
