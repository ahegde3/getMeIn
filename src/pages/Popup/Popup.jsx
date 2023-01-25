import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import { CSSTransition } from 'react-transition-group';

import './Popup.css';

const Popup = () => {
  const [angle, setAngle] = useState(0);
  const [timerState, setTimer] = useState(null);

  useEffect(() => {
    if (angle == 360) {
      clearInterval(timerState);
      setAngle(0);
    }
  }, [angle]);

  const updateAngle = () => {
    const timer = setInterval(() => {
      setAngle((prevAngle) => prevAngle + 45);
    }, 300);
    setTimer(timer);
  };
  const handleClick = () => {
    console.log('handleClick');
    updateAngle();

    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            message: 'give me access',
            domain: window.location.hostname,
          },
          function (response) {
            console.log(`message from background: ${JSON.stringify(response)}`);
          }
        );
      }
    );
  };

  return (
    <div className="App">
      <div
        style={{
          background: 'aliceblue',
          height: '-webkit-fill-available',
          padding: '59px',
          border: '2px solid',
        }}
      >
        <h1>Get Me In</h1>
        <CSSTransition
          in={true}
          timeout={300}
          classNames="lock"
          unmountOnExit
          style={{ marginBottom: '7px' }}
        >
          <div
            style={{
              transform: `rotate(${angle}deg)`,
              transition: 'transform 300ms',
            }}
          >
            <LockIcon fontSize="large" color="primary" />
          </div>
        </CSSTransition>
        <Button
          variant="contained"
          onClick={handleClick}
          style={{ marginTop: '2px' }}
        >
          Give me access
        </Button>
      </div>
    </div>
  );
};

export default Popup;
