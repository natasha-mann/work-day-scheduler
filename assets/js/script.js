const daySchedulerContainer = $(".container");
const textAreas = daySchedulerContainer.children().children("textarea");

//get current time from moment
const getCurrentDate = () => {
  const currentDate = moment().format("dddd Do MMMM");
  $("#currentDay").text(currentDate);
  return currentDate;
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

// Save hourly tasks to local storage
const storeHourlyTasks = (event) => {
  const target = $(event.target);

  if (target.is("button")) {
    const hour = target.siblings("textarea").data("time");
    const task = target.siblings("textarea").val();
    const userTask = {
      hour: hour,
      task: task,
    };
    const hourlyTasks = getHourlyTasksFromLocalStorage();
    hourlyTasks.push(userTask);
    localStorage.setItem("hourlyTasks", JSON.stringify(hourlyTasks));
  }
};

// Get hourly tasks from local storage
const getHourlyTasksFromLocalStorage = () => {
  const hourlyTasks = localStorage.getItem("hourlyTasks");
  if (hourlyTasks) {
    // set text content of text area to match task value
    setTextContent(hourlyTasks);
    return JSON.parse(hourlyTasks);
  } else {
    return [];
  }
};

// set text content
const setTextContent = (hourlyTasks) => {
  console.log("ok!");
};

// when the page loads
const onLoad = () => {
  getCurrentDate();
  colorCodeTimeBlocks();
  getHourlyTasksFromLocalStorage();
};

$(document).ready(onLoad);
$(daySchedulerContainer).on("click", storeHourlyTasks);
