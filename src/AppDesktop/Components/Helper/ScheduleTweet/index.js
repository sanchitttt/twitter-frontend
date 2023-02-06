import React, { useEffect, useState } from "react";
import './styles.css';
import { InputLabel, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FAndTButton from "../../Helper/PrimaryButton";

import Button from "@mui/material/Button";
import { createPortal } from "react-dom";
import PrimaryButton from "../../Helper/PrimaryButton";

const monthsArr = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const dateArr = [];

for (let i = 0; i <= 31; i++) dateArr.push(i);

const yearsArr = [2023, 2024, 2025];

const hoursArr = [];

for (let i = 0; i <= 12; i++) hoursArr.push(i);

const minutesArr = [];

for (let i = 0; i < 60; i++) minutesArr.push(i);

const weeksArr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const ScheduleDate = ({
  month,
  date,
  year,
  handleMonthChange,
  handleDateChange,
  handleYearChange,
  error
}) => {
  return (
    <div id="scheduleDateContainer">
      <div className="schedule-input-select schedule-input-select-month" id='schedule-input-month'>
        <FormControl fullWidth >
          <InputLabel error={error} id="schedule-month-label">Month</InputLabel>
          <Select
            error={error}
            labelId="schedule-month-label"
            id="schedule-month-label"
            value={month}
            label="Age"
            onChange={handleMonthChange}

          >
            {monthsArr.map((month) => {
              return (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="schedule-input-select schedule-input-select-date" id='schedule-input-date'>
        <FormControl fullWidth>
          <InputLabel error={error} id="schedule-date-label">Date</InputLabel>
          <Select
            error={error}
            labelId="schedule-date-label"
            id="schedule-date-label"
            value={date}
            label="Date"
            onChange={handleDateChange}
          >
            {dateArr.map((date) => {
              return (
                <MenuItem key={date} value={date}>
                  {date}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="schedule-input-select schedule-input-select-year" id='schedule-input-year'>
        <FormControl fullWidth>
          <InputLabel error={error} id="schedule-year-label">Year</InputLabel>
          <Select
            error={error}
            labelId="schedule-year-label"
            id="schedule-year-label"
            value={year}
            label="Year"
            onChange={handleYearChange}
          >
            {yearsArr.map((year) => {
              return (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

const ScheduleTime = ({
  hour,
  minute,
  amPm,
  handleHourChange,
  handleMinuteChange,
  handleAMPMChange,
  error
}) => {
  return (
    <div id="schedule-time-container">
      <div className="schedule-time schedule-time-hour" id='schedule-input-hour'>
        <FormControl fullWidth>
          <InputLabel error={error} id="schedule-month-label">Hour</InputLabel>
          <Select
            error={error}
            labelId="schedule-hour-label"
            id="schedule-hour-label"
            value={hour}
            label="Hour"
            onChange={handleHourChange}
          >
            {hoursArr.map((hour) => {
              return (
                <MenuItem key={hour} value={hour}>
                  {hour}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="schedule-time schedule-time-minute" id='schedule-input-minute'>
        <FormControl fullWidth>
          <InputLabel error={error} id="schedule-minute-label">Minute</InputLabel>
          <Select
            error={error}
            labelId="schedule-minute-label"
            id="schedule-minute-label"
            value={minute}
            label="Minute"
            onChange={handleMinuteChange}
          >
            {minutesArr.map((minute) => {
              return (
                <MenuItem key={minute} value={minute}>
                  {minute}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className="schedule-time schedule-time-ampm" id='schedule-input-ampm'>
        <FormControl fullWidth>
          <InputLabel error={error} id="schedule-ampm-label">AM/PM</InputLabel>
          <Select
            error={error}
            labelId="schedule-ampm-label"
            id="schedule-ampm-label"
            value={amPm}
            label="AM/PM"
            onChange={handleAMPMChange}
          >
            {["AM", "PM"].map((item) => {
              return (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

const ScheduleText = ({ children }) => {
  return (
    <div
      style={{
        fontSize: "15px",
        color: "#536471",
        marginLeft: "10px",
        marginTop: "10px"
      }}
    >
      {children}
    </div>
  );
};
const TimeZone = () => {
  return (
    <div
      style={{
        color: "#OF1419",
        fontSize: "20px",
        marginLeft: "10px",
        marginTop: "10px"
      }}
    >
      Indian Standard Time
    </div>
  );
};

const ScheduleFooter = ({ tweetThread, id, activeOptionHandler }) => {
  return (
    <div id="schedule-footer">
      <div id={tweetThread ? id : 'schedule-footer-button-container'} className="schedule-footer-button-container">
        <div style={{ fontSize: "14px", color: "#1D9BF0" }} onClick={() => activeOptionHandler('unsent-tweets')}>
          Scheduled Tweets
        </div>
      </div>
      <div></div>
    </div>
  );
};

const createDate = (year, month, date) => {
  return new Date(year, month, date);
};

const getWeek = (date) => {
  return weeksArr[date.getDay()];
};

const getTrimmedMonth = (month) => {
  return month.slice(0, 3);
};

const ScheduleTweet = React.forwardRef(
  ({ tweetThread, id, activeOptionHandler, scheduleObject, scheduleHandler }, ref) => {
    const [isThisAnUpdatingSchedule, setIsThisAnUpdatingTweet] = useState(
      false
    );
    const [dateError, setDateError] = useState(false);
    const [timeError, setTimeError] = useState(false);

    const [hour, setHour] = useState(() => {
      if (scheduleObject.hour === null) {
        let x = new Date().getHours();
        if (x >= 12) return x - 12;
        return x;
      }
      else {
        setIsThisAnUpdatingTweet(true);
        return scheduleObject.hour;
      }
    });
    const [minute, setMinute] = useState(() => {
      if (scheduleObject.minute === null) return new Date().getMinutes();
      else {
        setIsThisAnUpdatingTweet(true);
        return scheduleObject.minute;
      }
    });
    const [amPm, setAmPm] = useState(() => {
      if (scheduleObject.amPm === null) return "AM";
      else {
        setIsThisAnUpdatingTweet(true);
        return scheduleObject.amPm;
      }
    });

    const [month, setMonth] = useState(() => {
      if (scheduleObject.month) {
        setIsThisAnUpdatingTweet(true);
        return scheduleObject.month;
      } else return monthsArr[new Date().getMonth()];
    });
    const [date, setDate] = useState(() => {
      if (scheduleObject.date !== null) {
        setIsThisAnUpdatingTweet(true);
        return scheduleObject.date;
      } else return new Date().getDate();
    });
    const [year, setYear] = useState(() => {
      if (scheduleObject.year === null) return 2023;
      else {
        setIsThisAnUpdatingTweet(true);
        return scheduleObject.year;
      }
    });

    const [scheduledText, setScheduledText] = useState("");

    useEffect(() => {
      const updatedDate = createDate(year, new Date().getMonth(), date);
      const currWeek = getWeek(updatedDate);
      const trimmedMonth = getTrimmedMonth(month);

      setScheduledText(
        `Will send on ${currWeek}, ${trimmedMonth} ${date}, ${year} at ${hour}:${minute} ${amPm}`
      );
    }, []);

    useEffect(() => {
      const updatedDate = createDate(year, new Date().getMonth(), date);
      const currWeek = getWeek(updatedDate);
      const trimmedMonth = getTrimmedMonth(month);

      setScheduledText(
        `Will send on ${currWeek}, ${trimmedMonth} ${date}, ${year} at ${hour}:${minute} ${amPm}`
      );
    }, [hour, minute, amPm, month, date, year]);

    const handleMonthChange = (e) => {
      setMonth(e.target.value);
      let currDateStamp = new Date();
      let eventDateStamp = new Date(
        year,
        monthsArr.indexOf(e.target.value),
        date,
        hour,
        minute
      );
      if (eventDateStamp < currDateStamp) {
        setDateError(true);
      }
    };
    const handleDateChange = (e) => {
      setDate(e.target.value);
      let currDateStamp = new Date();
      let eventDateStamp = new Date(
        year,
        monthsArr.indexOf(month),
        e.target.value,
        hour,
        minute
      );

      if (eventDateStamp < currDateStamp) {
        setDateError(true);
      } else if (dateError) {
        console.log("no error");
        setDateError(false);
      }
    };
    const handleYearChange = (e) => {
      setYear(e.target.value);
      let currDateStamp = new Date();
      let eventDateStamp = new Date(
        e.target.value,
        monthsArr.indexOf(month),
        date,
        hour,
        minute
      );
      // console.log(currDateStamp);
      // console.log(eventDateStamp);
      if (eventDateStamp < currDateStamp) {
        setDateError(true);
      } else if (dateError) {
        setDateError(false);
      }
    };

    const handleHourChange = (e) => {
      setHour(e.target.value);
      let convertedHour =
        amPm === "PM" ? e.target.value + 12 : e.target.value - 12;
      let currDateStamp = new Date();
      let eventDateStamp = new Date(
        year,
        monthsArr.indexOf(month),
        date,
        convertedHour,
        minute
      );

      if (eventDateStamp < currDateStamp) {
        setTimeError(true);
      } else if (timeError) {
        setTimeError(false);
      }
    };

    const handleMinuteChange = (e) => {
      setMinute(e.target.value);
      let currDateStamp = new Date();
      let eventDateStamp = new Date(
        year,
        monthsArr.indexOf(month),
        date,
        hour,
        e.target.value
      );

      if (eventDateStamp < currDateStamp) {
        setTimeError(true);
      } else if (timeError) {
        setTimeError(false);
      }
    };
    const handleAMPMChange = (e) => {
      setAmPm(e.target.value);
      let convertedHour = e.target.value === "AM" ? hour - 12 : hour + 12;
      let currDateStamp = new Date();
      let eventDateStamp = new Date(
        year,
        monthsArr.indexOf(month),
        date,
        convertedHour,
        minute
      );

      if (eventDateStamp < currDateStamp) {
        setTimeError(true);
      } else if (timeError) {
        setTimeError(false);
      }
    };
    return (
      <div ref={ref}>
        {/* {createPortal( */}
        <div
          className="home-schedule"
          style={{
            width:
              document.documentElement.clientWidth > 700 ? "635px" : "100vw",
            height:
              document.documentElement.clientWidth > 700 ? "466px" : "100vh",
            background: "white",
            borderRadius: "15px"
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div
                id="home-schedule-close-icon"
                onClick={() => {
                  activeOptionHandler(null);
                }}
              >
                <img
                  src="https://thumbs4.imagebam.com/33/54/cd/MEHU3AO_t.png"
                  alt="close-icon"
                  width="20px"
                  height="20px"
                  id="home-schedule-close-icon-img"
                />
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginTop: "7.5px",
                  marginLeft: "10px"
                }}
              >
                Schedule
              </div>
            </div>
            {isThisAnUpdatingSchedule ? (
              <div
                style={{
                  display: "flex",
                  marginRight: "5px",
                  marginTop: "10px"
                }}
              >
                <div>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    fullWidth
                    onClick={() => {
                      scheduleHandler({
                        bool: false,
                        text: "",
                        month: null,
                        year: null,
                        date: null,
                        hour: null,
                        minute: null,
                        amPm: null
                      });
                      setIsThisAnUpdatingTweet(false);
                      activeOptionHandler(null);
                    }}
                  >
                    Remove poll
                  </Button>
                </div>
                <div style={{ marginLeft: "7.5px" }}>
                  <PrimaryButton
                    clickHandler={() => {
                      activeOptionHandler(null);
                      scheduleHandler({
                        bool: true,
                        text: scheduledText,
                        month: month,
                        year: year,
                        date: date,
                        hour: hour,
                        minute: minute,
                        amPm: amPm
                      });
                    }}
                    blackButton={true}
                  >
                    Update
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "7.5px", marginRight: "5px" }}>
                <PrimaryButton
                  clickHandler={() => {
                    activeOptionHandler(null);
                    scheduleHandler({
                      bool: true,
                      text: scheduledText,
                      month: month,
                      year: year,
                      date: date,
                      hour: hour,
                      minute: minute,
                      amPm: amPm
                    });
                  }}
                  blackButton={true}
                >
                  Confirm
                </PrimaryButton>
              </div>
            )}
          </div>
          <div>
            <div
              style={{ marginLeft: "20px", color: "#536471", fontSize: "13px" }}
            >
              <img
                src="https://thumbs4.imagebam.com/98/f9/99/MEHU2MK_t.png"
                width="18px"
                height="18px"
                alt="schedule-date-picker-img"
                style={{ marginRight: "5px" }}
              />
              {scheduledText}
            </div>
            <div></div>
          </div>
          <div id="schedule-date-component-container">
            <ScheduleText>Date</ScheduleText>
            <ScheduleDate
              error={dateError}
              isWrong={false}
              month={month}
              date={date}
              year={year}
              handleMonthChange={handleMonthChange}
              handleDateChange={handleDateChange}
              handleYearChange={handleYearChange}
            />
            {(dateError || timeError) && (
              <div style={{ color: "#F4212E", marginLeft: "10px" }}>
                You can not schedule a Tweet to send in the past.
              </div>
            )}
          </div>
          <div>
            <ScheduleText>Time</ScheduleText>
            <ScheduleTime
              error={timeError}
              hour={hour}
              minute={minute}
              amPm={amPm}
              handleHourChange={handleHourChange}
              handleMinuteChange={handleMinuteChange}
              handleAMPMChange={handleAMPMChange}
            />
          </div>

          <div>
            <ScheduleText>Time Zone</ScheduleText>
            <TimeZone />
          </div>
          <hr />
          {/* <ScheduleFooter tweetThread={tweetThread} id={id} activeOptionHandler={activeOptionHandler} /> */}
        </div>
        {/* ,document.getElementById('newTweet-schedule'))} */}
      </div>
    );
  }
);

export default ScheduleTweet;