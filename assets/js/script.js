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
  const target = $(event.currentTarget);

  console.log("hi");
  const hour = target.siblings("textarea").data("time");
  const task = target.siblings("textarea").val();
  const userTask = {
    hour: hour,
    task: task,
  };
  const hourlyTasks = getHourlyTasksObjectFromLocalStorage();
  hourlyTasks.push(userTask);
  localStorage.setItem("hourlyTasks", JSON.stringify(hourlyTasks));
};

// Get hourly tasks from local storage
const getHourlyTasksObjectFromLocalStorage = () => {
  const hourlyTasks = localStorage.getItem("hourlyTasks");
  if (hourlyTasks) {
    return JSON.parse(hourlyTasks);
  } else {
    return [];
  }
};

// set text content
const setTextContent = () => {
  // for each textArea, if hourlyTasks.hour matches data-time attribute, set text content to hourlyTasks.task
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
  getHourlyTasksObjectFromLocalStorage();
  setTextContent();
};

$(document).ready(onLoad);
$(daySchedulerContainer).on("click", "button", storeHourlyTasks);
