import React, { useState, useEffect } from 'react';
import {
  Button,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { CSSTransition } from 'react-transition-group';
import './Popup.css';

const Popup = () => {
  const [angle, setAngle] = useState(0);
  const [timerState, setTimer] = useState(null);
  const [domain, setDomain] = useState('current');

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
    updateAngle();

    const type = domain;

    chrome.tabs.query(
      { active: true, currentWindow: true },
      async function (tabs) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            message: 'give me access',
            type,
          },
          function (response) {}
        );
      }
    );
  };

  return (
    <div className="App">
      <div
        style={{
          background: 'aliceblue',
          height: 'fit-content',
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
        <FormControl sx={{ mt: 2 }}>
          <FormLabel id="demo-form-control-label-placement">
            Select the domain you want to access
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-form-control-label-placement"
            name="position"
            defaultValue="current"
            onChange={(e) => {
              setDomain(e.target.value);
            }}
          >
            <FormControlLabel
              value="current"
              control={<Radio />}
              label="Current"
            />
            <FormControlLabel
              value="medium"
              control={<Radio />}
              label="Medium"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
};

const theme = {
  spacing: 8,
};

export default Popup;
