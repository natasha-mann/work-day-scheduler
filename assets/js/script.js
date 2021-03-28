const getCurrentDateTime = () => {
  const currentDateTime = moment().format("dddd Do MMMM, HH:mm:ss");
  console.log(currentDateTime);
  return currentDateTime;
};

const onLoad = () => {
  //get current time from moment
  getCurrentDateTime();
  // append current time to header

  // set colour of time blocks
};

$(document).ready(onLoad);
