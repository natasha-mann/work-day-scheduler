const daySchedulerContainer = $(".container");
const textAreas = daySchedulerContainer.children().children("textarea");

//get current time from moment.js
const getCurrentDate = () => {
  const currentDate = moment().format("dddd Do MMMM");
  $("#currentDay").text(currentDate);
  return currentDate;
};

// set colour of time blocks to show past/present/future
const colorCodeTimeBlocks = () => {
  textAreas.each(setColor);
};

// callback function for colorCodeTimeBlocks
const setColor = (index, element) => {
  const currentHour = parseInt(moment().format("HH"));
  const timeBlockHour = parseInt(element.dataset.time);

  if (timeBlockHour < currentHour) {
    $(element).removeClass("future present");
    $(element).addClass("past");
  } else if (timeBlockHour === currentHour) {
    $(element).removeClass("past future");
    $(textAreas[index]).addClass("present");
  } else {
    $(element).removeClass("present past");
    $(element).addClass("future");
  }
};

// Save user inputted hourly tasks to local storage
const storeHourlyTasks = (event) => {
  const target = $(event.currentTarget);

  const hour = target.siblings("textarea").data("time");
  const task = target.siblings("textarea").val();
  const userTask = {
    hour: hour,
    task: task,
  };
  const hourlyTasks = getFromLocalStorage();
  hourlyTasks.push(userTask);
  localStorage.setItem("hourlyTasks", JSON.stringify(hourlyTasks));
};

// Get hourly tasks from local storage
const getFromLocalStorage = () => {
  const hourlyTasks = localStorage.getItem("hourlyTasks");
  if (hourlyTasks) {
    return JSON.parse(hourlyTasks);
  } else {
    return [];
  }
};

// set text content of text area with tasks stored in local storage
const setTextContent = () => {
  const hourlyTasks = JSON.parse(localStorage.getItem("hourlyTasks"));

  textAreas.each((i, element) => {
    const timeBlockHour = parseInt(element.dataset.time);

    $.each(hourlyTasks, (index, value) => {
      if (value.hour === timeBlockHour) {
        $(element).text(value.task);
      }
    });
  });
};

// when the page loads
const onLoad = () => {
  getCurrentDate();
  colorCodeTimeBlocks();
  getFromLocalStorage();
  setTextContent();
};

$(document).ready(onLoad);
$(daySchedulerContainer).on("click", "button", storeHourlyTasks);
