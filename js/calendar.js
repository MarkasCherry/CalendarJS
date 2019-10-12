var date = new Date();




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
  /*
    Tuesday, 1 January: New Year’s Day
    Friday, 19 April: Good Friday
    Monday, 22 April: Easter Monday
    Monday, 6 May: May Day Bank Holiday – first Monday in May
    Monday, 27 May: Spring Bank Holiday – last Monday in May
    Monday, 26 August: Summer Bank Holiday – last Monday in August
    Wednesday, 25 December: Christmas Day
    Thursday, 26 December: Boxing Day
    Wednesday, 2 January: New Year Holiday
    Monday, 4 February: Winter Holiday (R) – Inverness
    Monday, 25 March: Winter Holiday (R) – Lochaber
    Monday, 1 April: Spring Holiday (R) – Carnoustie, Dundee, Fife, Inverness, Monifieth, Perth, Scottish Borders
    Monday, 8 April: Spring Holiday (R) – Angus, Elgin
    Monday, 15 April: Spring Holiday (R) – Edinburgh
    Monday, 29 April: Spring Holiday (R) – Inverclyde
    Tuesday, 7 May: Victoria Day (R) – Clydebank, Stirling
    Monday, 20 May: Victoria Day (R) – Edinburgh
    Monday, 3 June: Victoria Day (R) – Fife, Galashiels, Inverclyde
    Thursday, 13 June: Lanimer Day (R) – Lanark
    Monday, 5 August: Summer Bank Holiday – first Monday in August
    Monday, 2 September: Late Summer Holiday (R) – Elgin, Inverclyde
    Monday, 9 September: Battle of Stirling Bridge (R) – Falkirk, Perth, Stirling
    Monday, 16 September: Autumn Holiday (R) – Edinburgh
    Monday, 30 September: Autumn Holiday (R) – Aberdeen, Angus, East Dumbartonshire, Glasgow, North Lanarkshire, Paisley, South Lanarkshire, West Dumbartonshire
    Monday, 7 October: Autumn Holiday (R) – Carnoustie, Dundee, Inverness, Monifieth, Perth
    Monday, 14 October: Autumn Holiday (R) – Scottish Borders
    Monday, 21 October: Autumn Holiday (R) – Elgin, Fife
    Monday, 4 November: Samhain (R) – Inverness
    Saturday, 30 November: St Andrew’s Day


  */
  if (date.getMonth() == 9 && date.getDate() == 1) {
    return "<br>MARK HOLIDAY";
  }
  else {
    return "";
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

  currentMonth = date.getMonth();

  //Display date of calendar
  document.getElementById("caption").innerHTML = getMon(currentMonth) + ", " + date.getFullYear();

  //Setting giving date to first day of given month
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay = firstDay.getDay();

  date = new Date(date.getFullYear(), date.getMonth(), 1 - new Date(date.getFullYear(), date.getMonth(), 1).getDay())

  var table = document.getElementById("clndr");

  var background_color = "";
  var text_color = "";

  for(var rowIndex = 1; rowIndex < 7; rowIndex++) {
    if (currentMonth < date.getMonth() && date.getMonth() != 11) {
      break;
    }
    else if (date.getMonth() == 0 && currentMonth == 11){
      break;
    }
    var row = table.insertRow(rowIndex);

    for(var colIndex = 0; colIndex < 7; colIndex++) {

      if (date.getMonth() == currentMonth) {
        background_color = "";
        text_color = "";
      }
      else {
        text_color = "#b9b4b4";
        background_color = "rgba(43, 43, 43, 0.21)";
      }

      if (date.getFullYear() === new Date().getFullYear() &&
          date.getMonth() === new Date().getMonth() &&
          date.getDate() == new Date().getDate()) {
            background_color = "#fb9ebd";
          }

      row.insertCell(colIndex).innerHTML = date.getDate() + eventDay(date);
      date.setDate(date.getDate()+1);

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
