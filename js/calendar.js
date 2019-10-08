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

function drawTable(date) {
  //Setting giving date to first day of given month
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay = firstDay.getDay() - 1;

  //console.log(firstDay);
  var daysNeeded = nofdays(date);
  var lastMonth = nofdays(new Date(date.getFullYear(), date.getMonth() - 1, 1));

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
        background_color = "#2b2b2b91";

      }
      else {
        if (!stop) {
          text_color = "";
          background_color = "";
        }
        else {
          text_color = "#b9b4b4";
          background_color = "#2b2b2b91";
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

var date = new Date();
date = new Date(2019, 9);

drawTable(date);


//Display date of calendar
document.getElementById("caption").innerHTML = getMon(date.getMonth()).toString()
+ ", " + date.getFullYear().toString();


/*
Year is leap year only if it's devisible by 4 and 400.
*/
