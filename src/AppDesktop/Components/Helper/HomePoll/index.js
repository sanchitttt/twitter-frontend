import React, { useReducer, useState } from "react";
import './styles.css';
import TextField from "@mui/material/TextField";
import { InputAdornment, InputLabel, MenuItem } from '@mui/material'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

const reducerFn = (state, action) => {
  switch (action.type) {
    case 1:
      if (action.text.length <= 25) return { ...state, poll1: action.text };
      else return state;
    case 2:
      if (action.text.length <= 25) return { ...state, poll2: action.text };
      else return state;
    case 3:
      if (action.text.length <= 25) return { ...state, poll3: action.text };
      else return state;
    case 4:
      if (action.text.length <= 25) return { ...state, poll4: action.text };
      else return state;
    default:
      return state;
  }
};

const initialState = {
  poll1: "",
  poll2: "",
  poll3: "",
  poll4: ""
};

// const pollsArr = [
//   ["poll1", 1],
//   ["poll2", 2]
// ];

const daysArr = [];
const hoursArr = [];
const minutesArr = [];

for (let i = 0; i <= 59; i++) {
  if (i >= 0 && i <= 7) {
    daysArr.push(i);
    hoursArr.push(i);
    minutesArr.push(i);
  } else if (i > 7 && i <= 23) {
    hoursArr.push(i);
    minutesArr.push(i);
  } else if (i >= 24 && i <= 59) minutesArr.push(i);
}

const PollsInput = () => {
  const [values, dispatch] = useReducer(reducerFn, initialState);
  const [count, setCount] = useState(3);
  const [pollsArr, setPollsArr] = useState([
    ["poll1", 1],
    ["poll2", 2]
  ]);
  const [activeOn, setActiveOn] = useState(2);

  const addPoll = () => {
    if (count <= 4) {
      setPollsArr([...pollsArr, [`poll${count}`, count]]);
      setCount((count) => count + 1);
      setActiveOn((activeOn) => activeOn + 1);
    }
  };

  return pollsArr.map((item, idx) => {
    const number = item[1];
    const val = values[`${item[0]}`];
    const label =
      item[1] > 2 ? `Choice ${item[1]} (optional)` : `Choice ${item[1]}`;
    return (<div className="individual-poll" key={idx}>
      <div className="individual-poll-input">
        <TextField
          className="mt-2"
          fullWidth
          id="outlined-basic"
          label={label}
          variant="outlined"
          value={val}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">{val.length}/25</InputAdornment>
            )
          }}
          onChange={(e) => {
            dispatch({ type: number, text: e.target.value });
          }}
        />
      </div>
      {activeOn !== 4 && <div onClick={addPoll} className="individual-poll-add">

        {activeOn === number && (
          <img
            src="https://i.ibb.co/GVK57mG/plus-blue.png"
            width="20px"
            height="20px"
            alt="plusIcon"
          />
        )}
      </div>
      }

    </div>)
  });
};

const PollsDate = () => {
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleDays = (e) => {
    setDays(e.target.value);
  };
  const handleHours = (e) => {
    setHours(e.target.value);
  };
  const handleMinutes = (e) => {
    setMinutes(e.target.value);
  };

  return (
    <div className="poll-date">
      <div className="poll-date-text">Poll date</div>
      <div className="poll-select-container">
        <div className="poll-select-input-container">
          <FormControl>
            <InputLabel id="poll-days">Days</InputLabel>
            <Select
              labelId="poll-days"
              id="poll-days"
              value={days}
              label="Days"
              onChange={handleDays}
              style={{ width: "90px" }}
            >
              {daysArr.map((day, idx) => {
                return (
                  <MenuItem key={idx} value={day}>
                    {day}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="poll-select-input-container">
          <FormControl>
            <InputLabel id="poll-hours">Hours</InputLabel>
            <Select
              labelId="poll-hours"
              id="poll-hours"
              value={hours}
              label="Hours"
              onChange={handleHours}
              style={{ width: "90px" }}
            >
              {hoursArr.map((hour, idx) => {
                return (
                  <MenuItem key={idx} value={hour}>
                    {hour}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div className="poll-select-input-container">
          <FormControl>
            <InputLabel id="poll-minutes">Minutes</InputLabel>
            <Select
              labelId="poll-minutes"
              id="poll-minutes"
              value={minutes}
              label="Minutes"
              onChange={handleMinutes}
              style={{ width: "90px" }}
            >
              {hoursArr.map((minute, idx) => {
                return (
                  <MenuItem key={idx} value={minute}>
                    {minute}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

const HomePoll = ({ activeOptionHandler }) => {
  return (
    <>
      <div className="container-fluid">
        <div className="card" style={{}}>
          <div className="card-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <div className="card-body">
                  <PollsInput />
                </div>
              </li>
              <li className="list-group-item">
                <div className="card-body">
                  <PollsDate />
                </div>
              </li>
              <li className="list-group-item">
                <div className="card-body">
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    fullWidth
                    onClick={() => activeOptionHandler(null)}
                  >
                    Remove poll
                  </Button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePoll;