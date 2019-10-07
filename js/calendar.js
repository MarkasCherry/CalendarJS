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
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay = firstDay.getDay();

  console.log(firstDay);

  var table = document.getElementById("clndr");
  rowsNeeded = 6;
  if (firstDay > 4) {
    rowsNeeded = 7;
  }

  var day = 1;
  for(var rowIndex = 1; rowIndex < rowsNeeded; rowIndex++) {
    var row = table.insertRow(rowIndex);

    for(var colIndex = 0; colIndex < 7; colIndex++) {
      if (firstDay == colIndex || day > 1) {
        row.insertCell(colIndex).innerHTML = day;
        day++;
      }
      else {
        row.insertCell(colIndex).innerHTML = "0";
      }
    }
  }
}

var date = new Date();
date = new Date(3037, 7);

drawTable(date);


//Display date month
document.getElementById("caption").innerHTML = getMon(date.getMonth()).toString()
+ ", " + date.getFullYear().toString();


/*
Year is leap year only if it's devisible by 4 and 400.
*/
