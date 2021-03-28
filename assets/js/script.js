//get current time from moment
const getCurrentDateTime = () => {
  const currentDateTime = moment().format("dddd Do MMMM, HH:mm:ss");
  $("#currentDay").text(currentDateTime);
  return currentDateTime;
};

// append current time to header + start clock timer
const startTimer = () => {
  const timerTick = () => {
    const currentDateTimeText = getCurrentDateTime();
    $("#currentDay").text(currentDateTimeText);
  };
  setInterval(timerTick, 1000);
};

// remove AM/PM to get hour from time block
const getHourFromTimeBlock = (row) => {
  const onlyNumbers = row.innerText.slice(0, -2);
  return [onlyNumbers];
};

// get array of time blocks from html
const getTimeBlockArray = () => {
  const timeBlocks = $(".container .row .hour");
  const timeBlockArray = $.map(timeBlocks, getHourFromTimeBlock);
  return timeBlockArray;
};

// set colour of time blocks to show past/present/future
const colorCodeTimeBlocks = () => {
  const currentHour = moment().format("HH");
};

const onLoad = () => {
  getCurrentDateTime();
  startTimer();
  colorCodeTimeBlocks();
};

$(document).ready(onLoad);
