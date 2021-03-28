const daySchedulerContainer = $(".container");
const textAreas = daySchedulerContainer.children().children("textarea");

//get current time from moment
const getCurrentDateTime = () => {
  const currentDateTime = moment().format("dddd Do MMMM");
  $("#currentDay").text(currentDateTime);
  return currentDateTime;
};

// set colour of time blocks to show past/present/future
const colorCodeTimeBlocks = () => {
  textAreas.each(setColor);
};

const setColor = (index) => {
  const currentHour = parseInt(moment().format("HH"));
  const timeBlockHour = parseInt(textAreas[index].dataset.time);

  if (timeBlockHour < currentHour) {
    $(textAreas[index]).removeClass("future present");
    $(textAreas[index]).addClass("past");
  } else if (timeBlockHour === currentHour) {
    $(textAreas[index]).removeClass("past future");
    $(textAreas[index]).addClass("present");
  } else {
    $(textAreas[index]).removeClass("present past");
    $(textAreas[index]).addClass("future");
  }
};

// when the page loads
const onLoad = () => {
  getCurrentDateTime();
  colorCodeTimeBlocks();
};

$(document).ready(onLoad);
