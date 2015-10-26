function buildChart(dates, asked, unanswered) {
  if (chart) {chart.destroy();}

  // console.log("in buildChart");
  // chart should scale to fit the whole graph
  var m = Math.max.apply(Math, asked)+50;
  var n = Math.min.apply(Math, unanswered)-50;

  var data = {
    labels : dates,
    datasets : [
      {
        fillColor : "#1145ff",
        strokeColor : "#000000",
        pointColor : "#fff",
        pointStrokeColor : "#000000",
        data : asked
      },
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,0.8)",
        pointColor : "#fff",
        pointStrokeColor : "#000000",
        data : unanswered
      }
    ]
  };

  var options = {
    scaleOverride : true, 
    scaleSteps : 10, 
    scaleStepWidth : m/10, 
    scaleStartValue : n
  };

  return new Chart(ctx).Line(data, options);
}

function buildTable(interval, dates, asked, unanswered, percentage){
  // console.log("in buildTable");
  var hours;
  if (interval === 1) {hours = 23;}
  else {hours = 47;}

  $("#theTable tbody").empty();
  for (var i=0; i<dates.length;i++) {
    var r = ["<tr>",
      "<td>",hours - i*interval,"</td>",
      "<td>",dates[i],"</td>",
      "<td>",percentage[i].toFixed(2)+'%',"</td>",
      "<td>",asked[i],"</td>",
      "<td>",unanswered[i],"</td>",
      "</tr>"].join(' ');

    $("#theTable tbody").append(r);
  }
  $("#theTable").tablesorter({
    sortList: [[0,1]]
  });
  $("#theTable").trigger("update");
}

function inactivate() {
  for (var i = 1; i <= 4; i++) {
    $("#"+i).removeClass("active");
  }
}

  // sets passes interval data and builds accordingly
function build(interval) {
  inactivate();
  var slicedDates = [];
  var slicedAsked = [];
  var slicedUnanswered = [];
  var slicedPercentage = [];
  if (interval === 1) {
    slicedDates = dates.slice(dates.length - 24, dates.length);
    slicedAsked = asked.slice(dates.length - 24, dates.length);
    slicedUnanswered = unanswered.slice(dates.length - 24, dates.length);
    slicedPercentage = percentage.slice(dates.length - 24, dates.length);
  }

  else {
    var tempTotal = 0;
  
    for (var i=interval-1; i<dates.length; i+=interval) {
      
      slicedDates.push(dates[i]);

      tempTotal = 0;
      for (var j=0; j<interval; j++) {
        tempTotal += asked[i-j];
      }
      slicedAsked.push(tempTotal);

      tempTotal = 0;
      for (var k=0; k<interval; k++) {
        tempTotal += unanswered[i-k];
      }
      slicedUnanswered.push(tempTotal);

      tempTotal = 0;
      for (var l=0; l<interval; l++) {
        tempTotal += percentage[i-l];
      }
      slicedPercentage.push(tempTotal/interval);

    }
  }

  var chart = buildChart(slicedDates, slicedAsked, slicedUnanswered);
  buildTable(interval, slicedDates, slicedAsked, slicedUnanswered, slicedPercentage);
  $("#" + interval).addClass("active");
  return chart;
}

// MAIN

// data set elsewhere

var ctx = document.getElementById("theChart").getContext("2d");
// chart should nicely occupy the space above the fold
ctx.canvas.width = window.innerWidth-30;
ctx.canvas.height = window.innerHeight-250;

// default interval 
var interval = 1;
var chart;
chart = build(interval);

// click handlers for intervals

$("#1").click(function(){
  chart = build(1);
});

$("#2").click(function(){
  chart = build(2);
});

$("#3").click(function(){
  chart = build(3);
});

$("#4").click(function(){
  chart = build(4);
});
