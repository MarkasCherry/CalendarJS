var date = new Date();

//Calculating how many days a month have.
function nofdays(date) {
  if (date.getMonth() == 0 || date.getMonth() == 2 || date.getMonth() == 4 ||
      date.getMonth() == 6 || date.getMonth() == 7 || date.getMonth() == 9 ||
      date.getMonth() == 11) {
        return 31;
  }
  else if (date.getMonth() == 1){
    if((date.getFullYear() % 4 == 0 && date.getFullYear() % 100 != 0) ||
        date.getFullYear() % 400 == 0) {
          return 29;  //29 days for leap years
        }
        else {
          return 28;  //28 days for not leap years
        }
  }
  else {
    return 30;
  }
}

function getMon(index) {
  var month = new Array();
  month[0] = "January";
  month[1] = "February";
  month[2] = "March";
  month[3] = "April";
  month[4] = "May";
  month[5] = "June";
  month[6] = "July";
  month[7] = "August";
  month[8] = "September";
  month[9] = "October";
  month[10] = "November";
  month[11] = "December";

  return month[index];
}

function eventDay(date) {
  if (date === new Date()) {
    console.log();
  }
}

function newDate(year, month) {
  date = new Date(year, month);
}

function removeTable() {
  var table = document.getElementById("clndr");

  for(var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
  }
}

function drawTable(date) {

  removeTable();

  //Setting giving date to first day of given month
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay = firstDay.getDay() - 1;

  //console.log(firstDay);
  var daysNeeded = nofdays(date);
  var lastMonth = nofdays(new Date(date.getFullYear(), date.getMonth() - 1, 1));

  //Display date of calendar
  document.getElementById("caption").innerHTML = getMon(date.getMonth()).toString()
  + ", " + date.getFullYear().toString();

  var table = document.getElementById("clndr");

  var background_color = "";
  var text_color = "";
  var day = 1;
  var stop = false;

  for(var rowIndex = 1; rowIndex < 7; rowIndex++) {
    if(stop) {
      break;
    }
    var row = table.insertRow(rowIndex);
    for(var colIndex = 0; colIndex < 7; colIndex++) {
      if (firstDay >= 0) {
        row.insertCell(colIndex).innerHTML = lastMonth - firstDay;
        firstDay--;
        text_color = "#b9b4b4";
        background_color = "rgba(43, 43, 43, 0.21)";

      }
      else {
        if (!stop) {     //Changes a color of days of next month
          text_color = "";
          background_color = "";
        }
        else {
          text_color = "#b9b4b4";
          background_color = "rgba(43, 43, 43, 0.21)";
        }

        if (date.getFullYear() === new Date().getFullYear() &&
            date.getMonth() === new Date().getMonth() &&
            day == new Date().getDate()) {
              background_color = "#fb9ebd";
            }

        row.insertCell(colIndex).innerHTML = day;
        day++;


        if (day > daysNeeded) {
          day = 1;
          stop = true;
        }
      }
      document.getElementById("clndr").rows[rowIndex].cells[colIndex].style.color = text_color;
      document.getElementById("clndr").rows[rowIndex].cells[colIndex].style.background = background_color;
    }
  }
}

function inputDate() {
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;
  submitOK = "true";

  if (isNaN(year) || year < 1) {
    alert("Please enter possible year");
    submitOK = "false";
  }

  if (isNaN(month) || month < 1 || month > 12) {
    alert("The month must be a number between 1 and 12");
    submitOK = "false";
  }

  if (submitOK == "false") {
    document.getElementById("dateForm").reset();
    return false;
  }
  else {
    newDate(year, month-1);
    drawTable(date);
    displayByID("reset");
    document.getElementById("dateForm").reset();
  }
}

function displayByID(id) {  //Display element with given ID
  document.getElementById(id).style.display = "block";
}

function hideByID(id) {   //Hide element with given ID
  document.getElementById(id).style.display = "none";
}
