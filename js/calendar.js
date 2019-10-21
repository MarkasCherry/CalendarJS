//Global date variable
var date = new Date();

//returns name of the month
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

//returns holidays
function eventDay(date) {
  //Algorithm for Easter dates
  var y = date.getFullYear();
  var a = y % 19;
  var b = y % 4;
  var c = y % 7;
  var k = parseInt(y / 100);
  var p = parseInt((13 + 8*k) / 25);
  var q = parseInt(k / 4);
  var m = (15 - p + k - q) % 30;
  var n = (4 + k - q) % 7;
  var d = (19*a + m) % 30;
  var e = (2*b + 4*c + 6*d + n) % 7;
  var day = 22 + d + e;

  if (day == 57) {
    day = 50;
  }

  if (d == 28 && e == 6 && (11*m + 11) % 30 < 19) {
    day = 49;
  }

  var easterDay = new Date(date.getFullYear(), 2, day);

  //If month and date are correct, returns name of holiday
  if (date.getMonth() == 0 && date.getDate() == 1) {
    return "<br>New Year’s Day";
  }

  else if (date.getMonth() == 0 && date.getDate() == 2) {
    return "<br>New Year Holiday";
  }

  else if (date.getMonth() == 2 && date.getDate() == 17) {
    return "<br>St Patrick’s Day";
  }

  else if (date.getMonth() == 2 && date.getDate() == 31) {
    return "<br>+Summer Time";
  }

  else if (date.getMonth() == easterDay.getMonth() && date.getDate() == easterDay.getDate() - 2) {
    return "<br>Good Friday";
  }

  else if (date.getMonth() == easterDay.getMonth() && date.getDate() == easterDay.getDate()) {
    return "<br>Easter Sunday";
  }

  else if (date.getMonth() == easterDay.getMonth() && date.getDate() == easterDay.getDate() + 1) {
    return "<br>Easter Monday";
  }

  else if (date.getMonth() == 4 && date.getDate() <= 7 && date.getDay() == 1) {
    return "<br>Bank Holiday";
  }

  else if (date.getMonth() == 4 && date.getDate() > 24 && date.getDay() == 1) {
    return "<br>Bank Holiday";
  }

  else if (date.getMonth() == 4 && date.getDate() > 17 && date.getDate() < 25 && date.getDay() == 1) {
    return "<br>Victoria Day";
  }

  else if (date.getMonth() == 7 && date.getDate() <= 7 && date.getDay() == 1) {
    return "<br>Bank Holiday";
  }

  else if (date.getMonth() == 7 && date.getDate() > 24 && date.getDay() == 1) {
    return "<br>Bank Holiday";
  }

  else if (date.getFullYear() == 1999 && date.getMonth() == 7 && date.getDate() == 8) {
    return "<br>Markas Birthday!";  //easter egg. My birthday lol. I know, very unporofessional
  }

  else if (date.getMonth() == 10 && date.getDate() == 30) {
    return "<br>St Andrew’s Day";
  }

  else if (date.getMonth() == 11 && date.getDate() == 24) {
    return "<br>Christmas Eve";
  }

  else if (date.getMonth() == 11 && date.getDate() == 25) {
    return "<br>Christmas Day";
  }

  else if (date.getMonth() == 11 && date.getDate() == 26) {
    return "<br>Boxing day";
  }

  //If there is not holiday that day, returns empty string
  else {
    return "";
  }
}

//Sets date manually
function newDate(year, month) {
  date = new Date(year, month);
}

//Creating end user notes
function createNote(id) {
  //if there is no note created, you can create new
  if(localStorage.getItem(id) == null || localStorage.getItem(id) == "") {
      var note = prompt("Enter new note:");

      if (note == null || note == "") {
        note = "";
      }
      else {
        note = "<br>NOTE: " + note;
      }

      localStorage.setItem(id, note); //saving to local memory so every user can have individual notes
      drawTable(date);  //redrawing table now including note
    }

  //if there is already note created, you can delete it
  else {
    if (confirm("Do you want to remove note?")) {
      localStorage.removeItem(id);  //removing note from local memory
      drawTable(date); //redrawing table without removed note
    }
  }
}

//Generates unique id for each table column [idYEARMMDD]
function generateID(date) {
  var id = "id" + date.getFullYear().toString();

  //if there is only one character, add 0 in beggining
  if (date.getMonth().toString().length == 1) {
    id += "0" + date.getMonth().toString();
  }
  else {
    id += date.getMonth().toString();
  }

  //if there is only one character, add 0 in beggining
  if (date.getDate().toString().length == 1) {
    id += "0" + date.getDate().toString();
  }
  else {
    id += date.getDate().toString();
  }

  return id;
}

//returns ID of column which was clicked
function getID() {
   return event.srcElement.id;
}


//Removes all table
function removeTable() {
  var table = document.getElementById("clndr");

  for(var i = table.rows.length - 1; i > 0; i--) {
      table.deleteRow(i);
  }
}

//Draws table
function drawTable(date) {
  removeTable(); //remove any tables on screen first

  currentMonth = date.getMonth(); //getting given date month

  //Display date of calendar in caption
  document.getElementById("caption").innerHTML = getMon(currentMonth) + ", " + date.getFullYear();

  //Setting giving date to first day of month, then taking back couple days
  //depanding weekday of 1st day of month, so they table will be started to show
  //from sunday, even if it is in the last month.
  date = new Date(date.getFullYear(), date.getMonth(), 1 - new Date(date.getFullYear(), date.getMonth(), 1).getDay())

  var table = document.getElementById("clndr");

  //Color of column (here - default colors of css)
  var background_color = "";
  var text_color = "";

  //Start drawing table day by day
  for(var rowIndex = 1; rowIndex < 7; rowIndex++) {
    //Breaking, to avoid extra rows of other month
    if (currentMonth == 0 && date.getMonth() == 1) {
      break;
    }
    else if (currentMonth == 0){
      //nothing (this condition to avoid bug)
    }
    else if (currentMonth < date.getMonth()) {
      break;
    }
    else if (date.getMonth() == 0 && currentMonth == 11) {
      break;
    }

    //new row
    var row = table.insertRow(rowIndex);

    for(var colIndex = 0; colIndex < 7; colIndex++) {
      //Giving colors by condition
      if (date.getMonth() == currentMonth) {  //default colors
        background_color = "";
        text_color = "";
      }
      else {  //color of other months
        text_color = "#b9b4b4";
        background_color = "rgba(43, 43, 43, 0.21)";
      }

      if (date.getFullYear() === new Date().getFullYear() &&
          date.getMonth() === new Date().getMonth() &&
          date.getDate() == new Date().getDate()) {
            background_color = "#fb9ebd"; //color for TODAY
          }

      //Display:
      //if there is no notes this day, just print date and event day (returned if exists)
      if (localStorage.getItem(generateID(date)) == null) {
        row.insertCell(colIndex).innerHTML = date.getDate() + eventDay(date);
      }
      //Otherwise, print date, event day and end-user note
      else {
        row.insertCell(colIndex).innerHTML = date.getDate() + eventDay(date) + localStorage.getItem(generateID(date));
      }

      //Aplying seted color for column
      document.getElementById("clndr").rows[rowIndex].cells[colIndex].style.color = text_color;
      document.getElementById("clndr").rows[rowIndex].cells[colIndex].style.background = background_color;
      //Adding ID and onclick attributes for each column
      document.getElementById("clndr").rows[rowIndex].cells[colIndex].setAttribute("id", generateID(date));
      document.getElementById("clndr").rows[rowIndex].cells[colIndex].setAttribute("onclick", "createNote(getID())");

      //going to next day
      date.setDate(date.getDate()+1);
    }
  }
}

//Display element with given ID
function displayByID(id) {
  document.getElementById(id).style.display = "block";
}

//Hide element with given ID
function hideByID(id) {
  document.getElementById(id).style.display = "none";
}

//Giving custom date
function inputDate() {
  var year = document.getElementById("year").value;
  var month = document.getElementById("month").value;
  submitted = "true";

  if (isNaN(year) || year < 1) {
    alert("Please enter possible year");
    submitted = "false";
  }

  if (isNaN(month) || month < 1 || month > 12) {
    alert("The month must be a number between 1 and 12");
    submitted = "false";
  }

  if (submitted == "false") {
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
