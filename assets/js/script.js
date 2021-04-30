const daySchedulerContainer = $(".container");
const textAreas = $('.container textarea[name="task"]');

const renderCurrentDate = () => {
  const currentDate = moment().format("dddd Do MMMM");
  $("#currentDay").text(currentDate);
};

const colorCodeTimeBlocks = () => {
  const setColor = (index, element) => {
    const currentHour = moment().hour();
    const timeBlockHour = parseInt(element.dataset.time, 10);

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

  textAreas.each(setColor);
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

const getFromLocalStorage = () => {
  const hourlyTasks = JSON.parse(localStorage.getItem("hourlyTasks"));

  return hourlyTasks ? hourlyTasks : [];
};

const setTextContent = () => {
  const hourlyTasks = getFromLocalStorage();

  textAreas.each((i, element) => {
    const timeBlockHour = parseInt(element.dataset.time, 10);

    $.each(hourlyTasks, (index, value) => {
      if (value.hour === timeBlockHour) {
        $(element).text(value.task);
      }
    });
  });
};

// when the page loads
const onLoad = () => {
  renderCurrentDate();
  colorCodeTimeBlocks();
  setTextContent();

  setInterval(colorCodeTimeBlocks, 60000);
};

$(document).ready(onLoad);
$(daySchedulerContainer).on("click", "button", storeHourlyTasks);
