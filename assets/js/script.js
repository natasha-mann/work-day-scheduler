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

const onLoad = () => {
  getCurrentDateTime();

  startTimer();
};

$(document).ready(onLoad);
